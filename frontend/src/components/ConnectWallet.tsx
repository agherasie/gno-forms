import { FC } from "react";
import { AdenaService } from "../services/adena/adena";
import { IAccountInfo } from "../services/adena/adena.types";
import { useAccountStore } from "../store";
import { constants } from "../constants";
import { Button, Text } from "@chakra-ui/react";

const ConnectWallet: FC = () => {
  const { setAccount, account } = useAccountStore();

  const handleWalletConnect = async () => {
    try {
      await AdenaService.establishConnection("disperse-front");
      const info: IAccountInfo = await AdenaService.getAccountInfo();
      await AdenaService.switchNetwork(constants.chainID);
      setAccount(info);
    } catch (e) {
      console.error(e);
    }
  };

  return account ? (
    <Text>logged in as {account?.address}</Text>
  ) : (
    <Button onClick={handleWalletConnect}>Connect Wallet</Button>
  );
};

export default ConnectWallet;
