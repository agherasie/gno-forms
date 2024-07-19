import { constants } from "../../constants";
import { AdenaService } from "../../services/adena/adena";
import { IAccountInfo } from "../../services/adena/adena.types";

export const handleWalletConnect = async (): Promise<IAccountInfo | null> => {
  try {
    await AdenaService.establishConnection("gno-forms-front");
    const info: IAccountInfo = await AdenaService.getAccountInfo();
    await AdenaService.switchNetwork(constants.chainID);
    return info;
  } catch (e) {
    console.error(e);
    return null;
  }
};
