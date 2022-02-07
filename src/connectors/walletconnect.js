import WalletConnectProvider from "@walletconnect/web3-provider";
import { CHAIN_INFO } from "../constants";

export default class WalletConnect {
  provider = null;
  account = null;
  chainId = null;

  async disconnect() {
    this.account = null;
    if (this.provider) {
      this.provider.close();
    }
    this.provider = null;
    this.chainId = null;
    // This localStorage key is set by @walletconnect/web3-provider
    // https://github.com/pancakeswap/pancake-frontend/blob/bdcb676700584f07b021679c6253dfed1db4d2ec/src/hooks/useAuth.ts#L65
    if (localStorage.getItem("walletconnect")) {
      localStorage.removeItem("walletconnect");
    }
  }

  async connect(chain) {
    const rpcUrl = CHAIN_INFO[chain].rpcUrl;
    this.provider = new WalletConnectProvider({
      rpc: {
        [chain]: rpcUrl,
      },
      qrcode: true,
      pollingInterval: 15000,
    });
    // ensure that the uri is going to be available, and emit an event if there's a new uri
    if (!this.provider.wc.connected) {
      await this.provider.wc.createSession({ chainId: chain });
    }
    // eslint-disable-next-line
    return new Promise(async (resolve, reject) => {
      // connection refused in wallet
      try {
        const accounts = await this.provider.enable();
        this.account = accounts[0];
        const chainId = await this.provider.request({ method: "eth_chainId" });
        this.chainId = chainId;
        resolve({
          provider: this.provider,
          chainId,
          account: this.account,
        });
      } catch (error) {
        reject("Unable to connect to wallet");
      }
    });
  }
}
