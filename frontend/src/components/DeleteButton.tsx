import { Icon, IconProps } from "@chakra-ui/react";
import { FC } from "react";
import { FaTrash } from "react-icons/fa";

interface DeleteButtonProps {
  onDelete: () => void;
  isDisabled: boolean;
}

const DeleteButton: FC<DeleteButtonProps & IconProps> = ({
  onDelete,
  isDisabled,
  ...props
}) => (
  <Icon
    as={FaTrash}
    color="gray.600"
    onClick={isDisabled ? undefined : onDelete}
    _hover={
      isDisabled
        ? { cursor: "not-allowed" }
        : { color: "red.500", cursor: "pointer" }
    }
    {...props}
  />
);

export default DeleteButton;
