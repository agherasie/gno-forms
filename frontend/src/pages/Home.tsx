import { Icon, Text, VStack, Wrap } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import FormCard, { FormCardDetails } from "../components/FormCard";
import { useNavigate } from "react-router-dom";
import { constants } from "../constants";
import { useProviderStore } from "../store";
import { parseDataJson } from "../utils";
import { CreatedForm } from "../type";

const Home: FC = () => {
  const navigate = useNavigate();

  const { provider } = useProviderStore();

  const [forms, setForms] = useState<CreatedForm[]>([]);

  useEffect(() => {
    if (!("evaluateExpression" in provider!)) return;

    provider
      .evaluateExpression(constants.realmPath, `GetForms()`)
      .then((res) => setForms(parseDataJson(res)));
  }, [provider]);

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
          {forms.map((form) => (
            <FormCardDetails key={form.id} formDetails={form} />
          ))}
        </Wrap>
      </VStack>
    </VStack>
  );
};

export default Home;
