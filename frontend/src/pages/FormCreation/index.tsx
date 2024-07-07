import { Button, chakra, VStack } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormCreationData, FieldType } from "../../type";
import FormDates from "./FormDates";
import FormHeader from "./FormHeader";
import FormFields from "./FormFields";

const FormCreation: FC = () => {
  const methods = useForm<FormCreationData>({
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
  const { watch, handleSubmit } = methods;

  const watchTitle = watch("title");

  useEffect(() => {
    document.title = `${watchTitle || "Untitled form"} - Gno Forms`;
  }, [watchTitle]);

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <chakra.form onSubmit={onSubmit} w="100%">
      <FormProvider {...methods}>
        <VStack py="24px" px="25%" spacing="48px">
          <VStack align="start" w="100%" spacing="24px">
            <FormHeader />
            <FormDates />
            <FormFields />
          </VStack>
          <Button w="100%" type="submit">
            Create form
          </Button>
        </VStack>
      </FormProvider>
    </chakra.form>
  );
};

export default FormCreation;
