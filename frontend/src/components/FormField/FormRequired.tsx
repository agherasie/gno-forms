import { VStack, Switch, Text } from "@chakra-ui/react";
import { FC } from "react";

interface FormRequiredProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

const FormRequired: FC<FormRequiredProps> = ({ value, onChange }) => (
  <VStack spacing={0}>
    <Text fontSize="12px" fontWeight="bold">
      Required
    </Text>
    <Switch
      isChecked={value}
      onChange={(event) => onChange(event.target.checked)}
      size="sm"
      colorScheme="gray"
    />
  </VStack>
);

export default FormRequired;
