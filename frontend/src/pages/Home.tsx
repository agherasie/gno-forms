import { Icon, Text, VStack, Wrap } from "@chakra-ui/react";
import { FC } from "react";
import { FaPlusCircle } from "react-icons/fa";
import FormCard, { FormCardDetails } from "../components/FormCard";
import { useNavigate } from "react-router-dom";

const Home: FC = () => {
  const navigate = useNavigate();

  return (
    <VStack w="100%" align="start" spacing={0}>
      <VStack
        align="start"
        spacing="24px"
        px="25%"
        py="24px"
        bg="gray.200"
        w="100%"
      >
        <Text fontSize="18px" fontWeight="bold">
          Start a new form
        </Text>
        <VStack align="start" spacing={0}>
          <FormCard onClick={() => navigate("create")}>
            <Icon as={FaPlusCircle} fontSize="26px" />
          </FormCard>
          <Text>Blank form</Text>
        </VStack>
      </VStack>
      <VStack align="start" spacing="24px" px="25%" py="24px" w="100%">
        <Text fontSize="18px" fontWeight="bold">
          Recent forms
        </Text>
        <Wrap shouldWrapChildren spacing="24px">
          <FormCardDetails title="Form 1" createdAt="2021-10-10" />
          <FormCardDetails title="Form 1" createdAt="2021-10-10" />
          <FormCardDetails title="Form 1" createdAt="2021-10-10" />
          <FormCardDetails title="Form 1" createdAt="2021-10-10" />
          <FormCardDetails title="Form 1" createdAt="2021-10-10" />
          <FormCardDetails title="Form 1" createdAt="2021-10-10" />
          <FormCardDetails title="Form 1" createdAt="2021-10-10" />
          <FormCardDetails title="Form 1" createdAt="2021-10-10" />
          <FormCardDetails title="Form 1" createdAt="2021-10-10" />
          <FormCardDetails title="Form 1" createdAt="2021-10-10" />
        </Wrap>
      </VStack>
    </VStack>
  );
};

export default Home;
