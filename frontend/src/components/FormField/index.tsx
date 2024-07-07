import {
  Card,
  HStack,
  Editable,
  EditablePreview,
  EditableInput,
} from "@chakra-ui/react";
import { FC, useCallback, useMemo } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { FieldData, FieldType, FormCreationData } from "../../type";
import FormFieldOptions from "./FormFieldOptions";
import FormFieldType from "./FormFieldType";
import FormRequired from "./FormRequired";
import DeleteButton from "../DeleteButton";

interface FormFieldProps {
  field: ControllerRenderProps<FormCreationData, "fields">;
  question: FieldData;
  idx: number;
}

const FormField: FC<FormFieldProps> = ({ idx, field }) => {
  const value = useMemo<FieldData>(() => field.value[idx], [field.value, idx]);

  const onChange = useCallback(
    (newVal: FieldData) =>
      field.onChange(field.value.map((v, i) => (i === idx ? newVal : v))),
    [field, idx]
  );

  return (
    <Card w="100%" bg="gray.100" p="24px">
      <HStack align="bottom" w="100%" justify="space-between" spacing="24px">
        <Editable
          onChange={(newLabel) =>
            onChange({
              ...value,
              label: newLabel,
            })
          }
          value={value.label}
          fontWeight="bold"
          w="100%"
          defaultValue="Untitled question"
        >
          <EditablePreview />
          <EditableInput />
        </Editable>
        <HStack align="center" spacing="16px">
          <FormRequired
            value={value.required}
            onChange={(newChecked) =>
              onChange({
                ...value,
                required: newChecked,
              })
            }
          />
          <FormFieldType value={value} onChange={onChange} />
          <DeleteButton
            fontSize="18px"
            onDelete={() =>
              field.onChange(field.value.filter((_, i) => i !== idx))
            }
            isDisabled={field.value.length === 1}
          />
        </HStack>
      </HStack>
      {(value.fieldType === FieldType.CHOICE ||
        value.fieldType === FieldType.MULTI_CHOICE) && (
        <FormFieldOptions
          value={value.options ?? []}
          onChange={(newOptions) =>
            onChange({
              ...value,
              options: newOptions,
            })
          }
        />
      )}
    </Card>
  );
};

export default FormField;
