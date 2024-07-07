import {
  Card,
  Editable,
  EditablePreview,
  EditableInput,
  EditableTextarea,
} from "@chakra-ui/react";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormCreationData } from "../../type";

const FormHeader: FC = () => {
  const { control } = useFormContext<FormCreationData>();

  return (
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
  );
};

export default FormHeader;
