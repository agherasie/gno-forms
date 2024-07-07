import { Box, Card, CardProps, Text, VStack } from "@chakra-ui/react";
import { colors } from "../theme";
import { FC, PropsWithChildren } from "react";
import { CreatedForm } from "../type";
import { selectColor } from "../utils";

const FormCard: FC<
  PropsWithChildren<{ withDetails?: boolean } & CardProps>
> = ({ children, withDetails, ...props }) => (
  <Card
    cursor="pointer"
    border={withDetails ? `1px solid ${colors.gray[300]}` : "none"}
    _hover={{
      border: `1px solid ${colors.gray[300]}`,
      color: colors.gray[600],
    }}
    color="gray.700"
    boxShadow="none"
    h="120px"
    w="160px"
    bg="white"
    align="center"
    justify="center"
    {...props}
  >
    {children}
  </Card>
);

interface FormCardDetailsProps {
  formDetails: CreatedForm;
}
const FormCardDetails: FC<FormCardDetailsProps> = ({ formDetails }) => (
  <VStack
    spacing={0}
    cursor="pointer"
    borderRadius="4px"
    _hover={{
      outline: `1px solid ${colors.gray[500]}`,
    }}
  >
    <FormCard
      bg={selectColor(+formDetails.id)}
      borderRadius="4px"
      borderBottomRadius="0px"
      withDetails
      p="8px"
    >
      <VStack w="100%" align="start" spacing={0}>
        {formDetails.fields.map((field) => (
          <Text fontSize="14px" key={field.label}>
            - {field.label}
          </Text>
        ))}
      </VStack>
    </FormCard>
    <Box
      w="100%"
      px="12px"
      borderBottomRadius="4px"
      bg={selectColor(+formDetails.id, 75, 90)}
      border={`1px solid ${colors.gray[300]}`}
      borderTop="none"
    >
      <Text fontWeight="bold" fontSize="12px">
        {formDetails.title}
      </Text>
      <Text fontSize="10px">{formDetails.description}</Text>
    </Box>
  </VStack>
);

export { FormCardDetails };
export default FormCard;
