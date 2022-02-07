import WalletConnect from "./walletconnect";
import Metamask from "./metamask";

export const connectors = {
  walletconnect: new WalletConnect(),
  metamask: new Metamask(),
};

export const getConnector = (id) => {
  return connectors[id];
};
