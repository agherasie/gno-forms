import {
  VStack,
  HStack,
  Icon,
  Editable,
  EditablePreview,
  EditableInput,
} from "@chakra-ui/react";
import { FC } from "react";
import { FaPlusCircle } from "react-icons/fa";
import DeleteButton from "../DeleteButton";

interface FormFieldOptionProps {
  value: string;
  onChange: (value: string) => void;
  onDelete: () => void;
  isDisabled: boolean;
}

const FormFieldOption: FC<FormFieldOptionProps> = ({
  isDisabled,
  onChange,
  onDelete,
  value,
}) => (
  <HStack spacing="8px">
    <DeleteButton fontSize="12px" isDisabled={isDisabled} onDelete={onDelete} />
    <Editable w="100%" fontSize="12px" onChange={onChange} value={value}>
      <EditablePreview />
      <EditableInput />
    </Editable>
  </HStack>
);

interface FormFieldOptionsProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const FormFieldOptions: FC<FormFieldOptionsProps> = ({ value, onChange }) => (
  <VStack w="100%" align="start" spacing="12px" mt="12px">
    <VStack w="100%" align="start" spacing="4px">
      {value?.map((option, optionIdx) => (
        <FormFieldOption
          key={optionIdx}
          isDisabled={value?.length === 1}
          onChange={(newOption) =>
            onChange(value.map((o, i) => (i === optionIdx ? newOption : o)))
          }
          onDelete={() => onChange(value.filter((_, i) => i !== optionIdx))}
          value={option ?? "Untitled option"}
        />
      ))}
    </VStack>
    <Icon
      cursor="pointer"
      onClick={() => onChange([...value, "Untitled option"])}
      _hover={{
        color: "gray.800",
      }}
      as={FaPlusCircle}
      fontSize="12px"
      color="gray.600"
    />
  </VStack>
);
export default FormFieldOptions;
