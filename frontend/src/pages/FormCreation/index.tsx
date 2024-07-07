import { Button, chakra, useToast, VStack } from "@chakra-ui/react";
import { FC, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormCreationData, FieldType, CreateFormDto } from "../../type";
import FormDates from "./FormDates";
import FormHeader from "./FormHeader";
import FormFields from "./FormFields";
import { AdenaService } from "../../services/adena/adena";
import { EMessageType } from "../../services/adena/adena.types";
import { useAccountStore } from "../../store";
import { constants } from "../../constants";
import { buildDataJson } from "../../utils";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const watchTitle = watch("title");

  useEffect(() => {
    document.title = `${watchTitle || "Untitled form"} - Gno Forms`;
  }, [watchTitle]);

  const { account } = useAccountStore();

  const toast = useToast();

  const onSubmit = handleSubmit((data) => {
    if (!account) return;

    const payload: CreateFormDto = {
      title: data.title,
      description: data.description,
      openAt: data.openAt,
      closeAt: data.closeAt,
      data: buildDataJson(data.fields),
    };

    console.log(payload);

    AdenaService.sendTransaction(
      [
        {
          type: EMessageType.MSG_CALL,
          value: {
            caller: account.address,
            send: "",
            pkg_path: constants.realmPath,
            func: "CreateForm",
            args: Object.values(payload),
          },
        },
      ],
      5000000
    )
      .then(() => {
        toast({
          title: "Form created",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/");
      })
      .catch(() =>
        toast({
          title: "Form creation failed",
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      );
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
