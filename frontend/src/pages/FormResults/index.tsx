import { Card, Code, Spinner, Text, VStack } from "@chakra-ui/react";
import { FC } from "react";
import useGetUrlFormDetails from "../../hooks/useGetUrlFormDetails";
import { useNavigate } from "react-router-dom";
import { selectColor } from "../../utils";

const FormResults: FC = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useGetUrlFormDetails();

  if (!data?.submissions) return null;

  return (
    <VStack w="100%" px="25%" py="48px" spacing="24px">
      {isLoading ? (
        <Spinner />
      ) : (
        <VStack w="100%" h="100%">
          {Object.entries(data?.submissions).map(([key, value], idx) => (
            <Card
              bg={selectColor(idx)}
              key={key}
              onClick={() => navigate(key)}
              w="100%"
              p="16px"
              cursor="pointer"
              align="start"
              _hover={{
                bg: selectColor(idx, 75, 75),
              }}
              gap="12px"
            >
              <Text>{key}</Text>
              <Code>{value.answers}</Code>
              <Text ml="auto" color="gray.200">
                {new Date(value.submittedAt).toLocaleString()}
              </Text>
            </Card>
          ))}
        </VStack>
      )}
    </VStack>
  );
};

export default FormResults;
