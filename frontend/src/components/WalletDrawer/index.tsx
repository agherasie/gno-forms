import {
  VStack,
  Divider,
  Wrap,
  Card,
  HStack,
  Text,
  Button,
  useToast,
  Box,
} from "@chakra-ui/react";
import { FC, useCallback, useEffect, useState } from "react";
import { BiCoinStack } from "react-icons/bi";
import { GiCrossedChains } from "react-icons/gi";
import { ImConnection } from "react-icons/im";
import { useAccountStore } from "../../store";
import { handleWalletConnect } from "./utils";
import { IoCopy } from "react-icons/io5";
import WalletIndicator from "./WalletIndicator";

const WalletDrawer: FC = () => {
  const { account, setAccount } = useAccountStore();

  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = useCallback(() => {
    setIsLoading(true);
    handleWalletConnect()
      .then(setAccount)
      .finally(() => setIsLoading(false));
  }, [setAccount]);

  useEffect(() => {
    handleConnect();
  }, [handleConnect, setAccount]);

  const toast = useToast();

  return (
    <VStack spacing="24px">
      <WalletIndicator />
      <Divider />
      {account ? (
        <VStack>
          <HStack>
            <Text>{account?.address}</Text>
            <Box
              onClick={() => {
                navigator.clipboard.writeText(account?.address);
                toast({
                  title: "Address copied",
                  status: "success",
                  duration: 2000,
                  isClosable: true,
                });
              }}
              cursor="pointer"
              color="gray.700"
              _hover={{
                color: "gray.600",
              }}
            >
              <IoCopy />
            </Box>
          </HStack>
          <Button size="sm" onClick={() => setAccount(null)}>
            Disconnect Wallet
          </Button>
        </VStack>
      ) : (
        <Button
          onClick={handleConnect}
          loadingText="Connecting wallet"
          isLoading={isLoading}
        >
          Connect Wallet
        </Button>
      )}
      <Divider />
      {!!account && (
        <Wrap>
          <Card p="16px">
            <HStack>
              <ImConnection color="blue" fontSize="24px" />
              <Text>{account?.status}</Text>
            </HStack>
          </Card>
          <Card p="16px">
            <HStack>
              <BiCoinStack color="gold" fontSize="24px" />
              <Text>{account?.coins}</Text>
            </HStack>
          </Card>
          <Card p="16px">
            <HStack>
              <GiCrossedChains color="red" fontSize="24px" />
              <Text>{account?.chainId}</Text>
            </HStack>
          </Card>
        </Wrap>
      )}
    </VStack>
  );
};

export default WalletDrawer;
