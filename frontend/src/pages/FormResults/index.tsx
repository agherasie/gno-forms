import {
  Divider,
  Heading,
  Skeleton,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { constants } from "../../constants";
import { useProviderStore } from "../../store";
import { CreatedForm, FieldType } from "../../type";
import { parseDataJson } from "../../utils";
import { useQuery } from "@tanstack/react-query";

const FormResults: FC = () => {
  const { provider } = useProviderStore();

  const { id, author } = useParams();

  const { data: form, isFetching: isLoadingQuestions } = useQuery({
    queryKey: [id ?? "id", "forms"],
    enabled: !!provider && "evaluateExpression" in provider,
    queryFn: () =>
      provider
        ?.evaluateExpression(constants.realmPath, `GetFormByID("${id}")`)
        .then((res) => parseDataJson(res) as CreatedForm),
  });

  const { data: answers, isFetching: isLoadingAnswers } = useQuery({
    queryKey: [author ?? "author", "answers"],
    enabled: "evaluateExpression" in provider!,
    queryFn: () =>
      provider
        ?.evaluateExpression(
          constants.realmPath,
          `GetAnswer("${id}", "${author}")`
        )
        .then((res) => parseDataJson(res) as string[]),
  });

  return (
    <VStack w="100%" px="25%" py="48px" spacing="24px">
      <VStack align="start" spacing="8px">
        {isLoadingQuestions ? (
          <Skeleton w="100px" h="24px" />
        ) : (
          <Heading fontSize="24px" fontWeight="bold">
            {form?.title}
          </Heading>
        )}
        {isLoadingQuestions ? (
          <Skeleton w="100%" h="24px" />
        ) : (
          <span>{form?.title}</span>
        )}
      </VStack>
      <Divider />
      {isLoadingQuestions || isLoadingAnswers ? (
        <Spinner />
      ) : (
        <VStack w="100%" align="start" spacing="16px">
          {form?.fields.map((field, idx) => (
            <VStack key={field.label} w="100%" align="start" spacing={0}>
              <Text fontSize="20px">{field.label}</Text>
              <Text fontSize="16px" color="gray.500">
                {field.fieldType === FieldType.BOOLEAN
                  ? answers?.at(idx)
                    ? "Yes"
                    : "No"
                  : answers?.at(idx) ?? "No answer"}
              </Text>
            </VStack>
          ))}
        </VStack>
      )}
    </VStack>
  );
};

export default FormResults;
