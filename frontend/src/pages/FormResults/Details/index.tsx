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
import { parseChoices, translateFieldType } from "../../../utils";

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
          {form?.fields.map((field, idx) => {
            let answer = answers?.at(idx) ?? "";
            const fieldType = translateFieldType(field.fieldType);
            if (fieldType === FieldType.BOOLEAN)
              answer = +answer ? "Yes" : "No";
            else if (fieldType === FieldType.CHOICE) {
              const choices = parseChoices(field.fieldType);
              answer = choices[+answer];
            } else if (fieldType === FieldType.MULTI_CHOICE) {
              const choices = parseChoices(field.fieldType);
              const answers = [];
              for (let i = 0; i < answer.length; i++) {
                answers.push(choices[i]);
              }
              answer = answers.join(", ");
            }
            return (
              <VStack key={field.label} w="100%" align="start" spacing={0}>
                <Text fontSize="20px">{field.label}</Text>
                <Text fontSize="16px" color="gray.500">
                  {answer}
                </Text>
              </VStack>
            );
          })}
        </VStack>
      )}
    </VStack>
  );
};

export default FormSubmission;
