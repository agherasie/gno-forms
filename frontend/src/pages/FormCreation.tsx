import {
  Card,
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
  HStack,
  Icon,
  Select,
  Switch,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FC } from "react";
import { FaTrash } from "react-icons/fa";

const FormCreation: FC = () => {
  return (
    <VStack py="24px" px="25%">
      <Text fontSize="18px" fontWeight="bold">
        Create a new form
      </Text>
      <VStack align="start" w="100%" spacing="24px">
        <Card w="100%" bg="gray.100" p="24px">
          <Editable w="100%" fontSize="24px" defaultValue="Untitled form">
            <EditablePreview />
            <EditableInput />
          </Editable>
          <Editable w="100%" defaultValue="Form description">
            <EditablePreview />
            <EditableTextarea />
          </Editable>
        </Card>
        <Card w="100%" bg="gray.100" p="24px">
          <HStack
            align="bottom"
            w="100%"
            justify="space-between"
            spacing="24px"
          >
            <Editable
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
                <Switch size="sm" colorScheme="gray" />
              </VStack>
              <Select mt="auto" h="30px" w="150px" defaultValue="text">
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="boolean">Boolean</option>
                <option value="select">Choice</option>
                <option value="select">Multichoice</option>
              </Select>
              <Icon
                fontSize="18px"
                as={FaTrash}
                cursor="pointer"
                color="gray.600"
                _hover={{ color: "red.500" }}
              />
            </HStack>
          </HStack>
        </Card>
      </VStack>
    </VStack>
  );
};

export default FormCreation;
