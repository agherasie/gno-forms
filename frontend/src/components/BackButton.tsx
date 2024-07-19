import { HStack, Icon, Text } from "@chakra-ui/react";
import { FC } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const BackButton: FC = () => {
  const navigate = useNavigate();

  return (
    <HStack
      p="8px"
      transition="0.5s"
      _hover={{ bg: "gray.100" }}
      onClick={() => navigate("/")}
      cursor="pointer"
    >
      <Icon as={BsArrowLeft} />
      <Text>Back</Text>
    </HStack>
  );
};

export default BackButton;
