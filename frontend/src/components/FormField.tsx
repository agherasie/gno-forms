import {
  Card,
  HStack,
  Editable,
  EditablePreview,
  EditableInput,
  VStack,
  Switch,
  Select,
  Icon,
  Text,
} from "@chakra-ui/react";
import { FC, useCallback, useMemo } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { FaPlusCircle, FaTrash } from "react-icons/fa";
import { FieldData, FieldType, FormCreationData } from "../type";

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
          <VStack spacing={0}>
            <Text fontSize="12px" fontWeight="bold">
              Required
            </Text>
            <Switch
              isChecked={value.required}
              onChange={(event) =>
                onChange({
                  ...value,
                  required: event.target.checked,
                })
              }
              size="sm"
              colorScheme="gray"
            />
          </VStack>
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
          <Icon
            fontSize="18px"
            as={FaTrash}
            color="gray.600"
            onClick={
              field.value.length === 1
                ? undefined
                : () => field.onChange(field.value.filter((_, i) => i !== idx))
            }
            _hover={
              field.value.length === 1
                ? { cursor: "not-allowed" }
                : { color: "red.500", cursor: "pointer" }
            }
          />
        </HStack>
      </HStack>
      {(value.fieldType === FieldType.CHOICE ||
        value.fieldType === FieldType.MULTI_CHOICE) && (
        <VStack w="100%" align="start" spacing="12px" mt="12px">
          <VStack w="100%" align="start" spacing="4px">
            {value.options?.map((option, optionIdx) => (
              <HStack key={optionIdx} spacing="8px">
                <Icon
                  as={FaTrash}
                  fontSize="12px"
                  color="gray.500"
                  _hover={
                    value.options?.length === 1
                      ? { cursor: "not-allowed" }
                      : { color: "red.500", cursor: "pointer" }
                  }
                  onClick={
                    value.options?.length === 1
                      ? undefined
                      : () =>
                          onChange({
                            ...value,
                            options: (value.options ?? []).filter(
                              (_, i) => i !== optionIdx
                            ),
                          })
                  }
                />
                <Editable
                  w="100%"
                  fontSize="12px"
                  onChange={(newOption) =>
                    onChange({
                      ...value,
                      options: (value.options ?? []).map((o, i) =>
                        i === optionIdx ? newOption : o
                      ),
                    })
                  }
                  value={option ?? "Untitled option"}
                >
                  <EditablePreview />
                  <EditableInput />
                </Editable>
              </HStack>
            ))}
          </VStack>
          <Icon
            cursor="pointer"
            onClick={() =>
              onChange({
                ...value,
                options: [...(value.options ?? []), "Untitled option"],
              })
            }
            _hover={{
              color: "gray.800",
            }}
            as={FaPlusCircle}
            fontSize="12px"
            color="gray.600"
          />
        </VStack>
      )}
    </Card>
  );
};

export default FormField;
