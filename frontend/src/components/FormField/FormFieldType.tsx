import { Select } from "@chakra-ui/react";
import { FC } from "react";
import { FieldData, FieldType } from "../../type";

interface FormFieldTypeProps {
  value: FieldData;
  onChange: (newVal: FieldData) => void;
}

const FormFieldType: FC<FormFieldTypeProps> = ({ value, onChange }) => (
  <Select
    onChange={(event) =>
      onChange({
        ...value,
        fieldType: event.target.value as FieldType,
        options: [
          ...(event.target.value === FieldType.CHOICE ||
          event.target.value === FieldType.MULTI_CHOICE
            ? ["Untitled option"]
            : []),
        ],
      })
    }
    value={value.fieldType}
    mt="auto"
    h="30px"
    w="150px"
  >
    {Object.values(FieldType).map((type) => (
      <option key={type} value={type}>
        {type}
      </option>
    ))}
  </Select>
);

export default FormFieldType;
