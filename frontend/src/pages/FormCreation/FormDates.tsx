import {
  Card,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { FormCreationData } from "../../type";

const FormDates: FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormCreationData>();

  return (
    <Card w="100%" bg="gray.100" p="24px">
      <SimpleGrid columns={2} w="100%" spacing="24px">
        <FormControl w="100%" isInvalid={!!errors.openAt}>
          <FormLabel>Open at</FormLabel>
          <Input {...register("openAt", { required: true })} type="date" />
          <FormErrorMessage>Field is required</FormErrorMessage>
        </FormControl>
        <FormControl w="100%" isInvalid={!!errors.closeAt}>
          <FormLabel>Close at</FormLabel>
          <Input {...register("closeAt", { required: true })} type="date" />
          <FormErrorMessage>Field is required</FormErrorMessage>
        </FormControl>
      </SimpleGrid>
    </Card>
  );
};

export default FormDates;
