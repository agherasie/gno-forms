import { FC, useEffect } from "react";
import { constants } from "../../constants";
import { useAccountStore, useProviderStore } from "../../store";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { parseChoices, parseDataJson, translateFieldType } from "../../utils";
import { CreatedForm, FieldType } from "../../type";
import {
  Button,
  chakra,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
  Radio,
  RadioGroup,
  Spinner,
  Switch,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { AdenaService } from "../../services/adena/adena";
import { EMessageType } from "../../services/adena/adena.types";

const FormSubmit: FC = () => {
  const { provider } = useProviderStore();

  const { id } = useParams();

  const { data: form, isLoading } = useQuery({
    queryKey: [id ?? "id", "forms"],
    enabled: !!provider && "evaluateExpression" in provider,
    queryFn: () => {
      return provider
        ?.evaluateExpression(constants.realmPath, `GetFormByID("${id}")`)
        .then((res) => parseDataJson(res) as CreatedForm);
    },
  });

  const { account } = useAccountStore();

  const toast = useToast();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutate: submitForm } = useMutation({
    mutationFn: (args: string[]) =>
      AdenaService.sendTransaction(
        [
          {
            type: EMessageType.MSG_CALL,
            value: {
              caller: account?.address ?? "",
              send: "",
              pkg_path: constants.realmPath,
              func: "SubmitForm",
              args,
            },
          },
        ],
        5000000
      ),
    onSuccess: () => {
      toast({
        title: "Form submitted",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/");
      queryClient.invalidateQueries({ queryKey: ["answers"] });
    },
    onError: (e, data) => {
      console.error(e);
      console.error(data);
      toast({
        title: "Form submit failed",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const { control, handleSubmit } = useForm();

  const onSubmit = handleSubmit((data) => {
    if (!account) return;

    const args = (data.fields as []).map((answer, idx) => {
      const fieldType = translateFieldType(
        form?.fields[idx].fieldType as string
      );
      if (fieldType === FieldType.NUMBER) return parseInt(answer as string, 10);
      if (fieldType === FieldType.BOOLEAN) return answer ? true : false;
      if (fieldType === FieldType.CHOICE)
        return parseChoices(form?.fields[idx].fieldType as string).indexOf(
          answer
        );
      if (fieldType === FieldType.MULTI_CHOICE)
        return (answer as string[]).map((a) =>
          parseChoices(form?.fields[idx].fieldType as string).indexOf(a)
        );
      return answer;
    });

    submitForm([id!, JSON.stringify(args)]);
  });

  useEffect(() => {
    document.title = `${form?.title} - Gno Forms`;
  }, [form?.title]);

  return (
    <chakra.form onSubmit={onSubmit} w="100%">
      <VStack w="100%" align="start" px="25%" py="48px" spacing="48px">
        <VStack w="100%" align="start" spacing="12px">
          <Heading>{form?.title}</Heading>
          <Text>{form?.description}</Text>
        </VStack>
        {isLoading ? (
          <Spinner m="auto" />
        ) : (
          <VStack align="start" spacing="16px" w="100%">
            {form?.fields.map((field, idx) => (
              <VStack w="100%" key={field.label} align="start" spacing="16px">
                <FormControl isRequired={field.required}>
                  <FormLabel>{field.label}</FormLabel>
                  <Controller
                    control={control}
                    name={`fields.${idx}`}
                    render={({ field: rhfField }) => (
                      <>
                        {field.fieldType === FieldType.TEXT && (
                          <Input
                            {...rhfField}
                            placeholder="Type your answer here"
                          />
                        )}
                        {field.fieldType === FieldType.BOOLEAN && (
                          <Switch {...rhfField} colorScheme="gray" />
                        )}
                        {field.fieldType === FieldType.NUMBER && (
                          <NumberInput>
                            <NumberInputField {...rhfField}></NumberInputField>
                          </NumberInput>
                        )}
                        {translateFieldType(field.fieldType) ===
                          FieldType.CHOICE && (
                          <RadioGroup {...rhfField}>
                            <VStack align="start" w="100%">
                              {parseChoices(field.fieldType).map((choice) => (
                                <Radio key={choice} value={choice}>
                                  {choice}
                                </Radio>
                              ))}
                            </VStack>
                          </RadioGroup>
                        )}
                        {translateFieldType(field.fieldType) ===
                          FieldType.MULTI_CHOICE && (
                          <CheckboxGroup {...rhfField}>
                            <VStack align="start" w="100%">
                              {parseChoices(field.fieldType).map((choice) => (
                                <Checkbox key={choice} value={choice}>
                                  {choice}
                                </Checkbox>
                              ))}
                            </VStack>
                          </CheckboxGroup>
                        )}
                      </>
                    )}
                  />
                </FormControl>
              </VStack>
            ))}
          </VStack>
        )}
        <Button w="100%" type="submit">
          Submit
        </Button>
      </VStack>
    </chakra.form>
  );
};

export default FormSubmit;
