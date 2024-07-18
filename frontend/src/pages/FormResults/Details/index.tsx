import {
  Divider,
  Heading,
  Skeleton,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FC } from "react";
import { FieldType } from "../../../type";
import useGetUrlFormDetails from "../../../hooks/useGetUrlFormDetails";
import useGetUrlSubmissionDetails from "../../../hooks/useGetUrlSubmissionDetails";

const FormSubmission: FC = () => {
  const { data: form, isFetching: isLoadingQuestions } = useGetUrlFormDetails();
  const { data: answers, isFetching: isLoadingAnswers } =
    useGetUrlSubmissionDetails();

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

export default FormSubmission;
