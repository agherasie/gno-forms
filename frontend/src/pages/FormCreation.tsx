import {
  Card,
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
  FormControl,
  FormLabel,
  Icon,
  Input,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import FormField from "../components/FormField";
import { FormCreationData, FieldType } from "../type";
import { FaPlusCircle } from "react-icons/fa";

const FormCreation: FC = () => {
  const { control, watch, register } = useForm<FormCreationData>({
    defaultValues: {
      title: "Untitled form",
      description: "Form description",
      fields: [
        {
          fieldType: FieldType.TEXT,
          label: "Untitled question",
          required: false,
        },
      ],
    },
  });

  const [watchTitle, watchFields] = watch(["title", "fields"]);
  console.log({ watchFields });

  useEffect(() => {
    document.title = `${watchTitle || "Untitled form"} - Gno Forms`;
  }, [watchTitle]);

  return (
    <VStack py="24px" px="25%">
      <VStack align="start" w="100%" spacing="24px">
        <Card w="100%" bg="gray.100" p="24px">
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <Editable
                w="100%"
                fontWeight="bold"
                fontSize="24px"
                value={field.value}
              >
                <EditablePreview />
                <EditableInput {...field} />
              </Editable>
            )}
          />
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <Editable w="100%" fontSize="16px" value={field.value}>
                <EditablePreview />
                <EditableTextarea {...field} />
              </Editable>
            )}
          />
        </Card>
        <Card w="100%" bg="gray.100" p="24px">
          <SimpleGrid columns={2} w="100%" spacing="24px">
            <FormControl w="100%">
              <FormLabel>Open at</FormLabel>
              <Input {...register("openAt")} type="date" />
            </FormControl>
            <FormControl w="100%">
              <FormLabel>Close at</FormLabel>
              <Input {...register("closeAt")} type="date" />
            </FormControl>
          </SimpleGrid>
        </Card>
        <Controller
          control={control}
          name="fields"
          render={({ field }) => (
            <VStack w="100%">
              {watchFields.map((question, idx) => (
                <FormField
                  key={idx}
                  idx={idx}
                  field={field}
                  question={question}
                />
              ))}
              <Icon
                cursor="pointer"
                onClick={() =>
                  field.onChange(
                    field.value.concat({
                      fieldType: FieldType.TEXT,
                      label: "Untitled question",
                      required: false,
                    })
                  )
                }
                _hover={{
                  color: "gray.800",
                }}
                as={FaPlusCircle}
                fontSize="24px"
                color="gray.600"
              />
            </VStack>
          )}
        />
      </VStack>
    </VStack>
  );
};

export default FormCreation;
