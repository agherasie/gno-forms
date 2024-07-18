import {
  Card,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Checkbox,
  HStack,
  Text,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormCreationData } from "../../type";

const FormDates: FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormCreationData>();

  const [requireOpenAt, setRequireOpenAt] = useState(false);
  const [requireCloseAt, setRequireCloseAt] = useState(false);

  return (
    <Card w="100%" bg="gray.100" p="24px">
      <HStack ml={requireOpenAt || requireCloseAt ? "auto" : "unset"}>
        <Text>Open at</Text>
        <Checkbox onChange={() => setRequireOpenAt(!requireOpenAt)} />
      </HStack>
      <HStack ml={requireOpenAt || requireCloseAt ? "auto" : "unset"}>
        <Text>Close at</Text>
        <Checkbox onChange={() => setRequireCloseAt(!requireCloseAt)} />
      </HStack>
      <SimpleGrid columns={2} w="100%" spacing="24px">
        {requireOpenAt && (
          <FormControl w="100%" isInvalid={!!errors.openAt}>
            <FormLabel>Open at</FormLabel>
            <Input
              {...register("openAt", { required: true })}
              type="datetime-local"
            />
            <FormErrorMessage>Field is required</FormErrorMessage>
          </FormControl>
        )}
        {requireCloseAt && (
          <FormControl w="100%" isInvalid={!!errors.closeAt}>
            <FormLabel>Close at</FormLabel>
            <Input
              {...register("closeAt", { required: true })}
              type="datetime-local"
            />
            <FormErrorMessage>Field is required</FormErrorMessage>
          </FormControl>
        )}
      </SimpleGrid>
    </Card>
  );
};

export default FormDates;
