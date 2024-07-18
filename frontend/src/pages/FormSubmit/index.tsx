import { FC, useEffect, useMemo } from "react";
import { constants } from "../../constants";
import { useAccountStore } from "../../store";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { parseChoices, translateFieldType } from "../../utils";
import { FieldType } from "../../type";
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
  Tooltip,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { AdenaService } from "../../services/adena/adena";
import { EMessageType } from "../../services/adena/adena.types";
import useGetUrlFormDetails from "../../hooks/useGetUrlFormDetails";

const FormSubmit: FC = () => {
  const { data: form, isLoading } = useGetUrlFormDetails();

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
    if (!account || !form) return;

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

    submitForm([form.id, JSON.stringify(args)]);
  });

  useEffect(() => {
    document.title = `${form?.title} - Gno Forms`;
  }, [form?.title]);

  const { isOpen: isFormOpen, reason: formDisabledReason } = useMemo<{
    isOpen: boolean;
    reason: string | null;
  }>(() => {
    const now = new Date().getTime();
    const openAt = new Date(form?.openAt ?? "");
    const closeAt = new Date(form?.closeAt ?? "");
    if (now < openAt.getTime()) {
      return {
        isOpen: false,
        reason: `Form opens at ${openAt.toLocaleString()}`,
      };
    }
    if (now > closeAt.getTime()) {
      return {
        isOpen: false,
        reason: `Form is closed since ${closeAt.toLocaleString()}`,
      };
    }
    return { isOpen: true, reason: null };
  }, [form?.closeAt, form?.openAt]);

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
                <FormControl
                  isRequired={
                    translateFieldType(field.fieldType) ===
                    FieldType.MULTI_CHOICE
                      ? false
                      : field.required
                  }
                >
                  <FormLabel>{field.label}</FormLabel>
                  <Controller
                    control={control}
                    name={`fields.${idx}`}
                    render={({ field: rhfField }) => (
                      <>
                        {field.fieldType === FieldType.STRING && (
                          <Input
                            {...rhfField}
                            placeholder="Type your answer here"
                            isDisabled={!isFormOpen}
                          />
                        )}
                        {field.fieldType === FieldType.BOOLEAN && (
                          <Switch
                            {...rhfField}
                            colorScheme="gray"
                            isDisabled={!isFormOpen}
                          />
                        )}
                        {field.fieldType === FieldType.NUMBER && (
                          <NumberInput isDisabled={!isFormOpen}>
                            <NumberInputField {...rhfField}></NumberInputField>
                          </NumberInput>
                        )}
                        {translateFieldType(field.fieldType) ===
                          FieldType.CHOICE && (
                          <RadioGroup {...rhfField} isDisabled={!isFormOpen}>
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
                                <Checkbox
                                  key={choice}
                                  value={choice}
                                  isDisabled={!isFormOpen}
                                >
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
        <Tooltip label={formDisabledReason}>
          <Button isDisabled={!isFormOpen} w="100%" type="submit">
            Submit
          </Button>
        </Tooltip>
      </VStack>
    </chakra.form>
  );
};

export default FormSubmit;
