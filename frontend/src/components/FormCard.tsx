import { Box, Card, CardProps, Text, VStack } from "@chakra-ui/react";
import { colors } from "../theme";
import { FC, PropsWithChildren } from "react";

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
    h="150px"
    w="200px"
    bg="white"
    align="center"
    justify="center"
    {...props}
  >
    {children}
  </Card>
);

interface FormCardDetailsProps {
  title: string;
  createdAt: string;
}
const FormCardDetails: FC<FormCardDetailsProps> = ({ createdAt, title }) => (
  <VStack
    spacing={0}
    cursor="pointer"
    borderRadius="4px"
    _hover={{
      outline: `1px solid ${colors.gray[500]}`,
    }}
  >
    <FormCard
      bg="gray.100"
      borderRadius="4px"
      borderBottomRadius="0px"
      withDetails
    ></FormCard>
    <Box
      w="100%"
      px="12px"
      borderBottomRadius="4px"
      border={`1px solid ${colors.gray[300]}`}
      borderTop="none"
    >
      <Text fontWeight="bold" fontSize="12px">
        {title}
      </Text>
      <Text fontSize="10px">{createdAt}</Text>
    </Box>
  </VStack>
);

export { FormCardDetails };
export default FormCard;
