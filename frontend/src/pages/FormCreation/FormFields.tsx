import { VStack, Icon, FormErrorMessage, FormControl } from "@chakra-ui/react";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FaPlusCircle } from "react-icons/fa";
import FormField from "../../components/FormField";
import { FieldType, FormCreationData } from "../../type";

const FormFields: FC = () => {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<FormCreationData>();

  const watchFields = watch("fields");

  return (
    <FormControl w="100%" isInvalid={!!errors.fields}>
      <Controller
        control={control}
        name="fields"
        rules={{
          validate: (fields) => fields.length > 0,
        }}
        render={({ field }) => (
          <VStack w="100%" spacing="24px">
            <FormErrorMessage>
              At least one question is required
            </FormErrorMessage>
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
    </FormControl>
  );
};

export default FormFields;
