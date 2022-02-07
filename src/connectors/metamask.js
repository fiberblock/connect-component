import BigNumber from "bignumber.js";
import { CHAIN_INFO } from "../constants";

export default class Metamask {
  provider = null;
  account = null;
  chainId = null;

  async disconnect() {
    this.account = null;
    if (this.provider) {
      this.provider.removeAllListeners();
    }
    this.provider = null;
    this.chainId = null;
  }

  async connect(chain) {
    const chainInfo = CHAIN_INFO[chain];
    if (!window.ethereum) {
      throw new Error("Please install metamask first");
    }
    this.provider = window.ethereum;
    const chainId = Number(
      await this.provider.request({ method: "eth_chainId" })
    );
    if (chainId !== chain) {
      await this.provider.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x" + new BigNumber(chain).toString(16),
            chainName: chainInfo.name,
            nativeCurrency: chainInfo.nativeCurrency,
            rpcUrls: [chainInfo.rpcUrl],
            blockExplorerUrls: [chainInfo.explorer],
          },
        ],
      });
    }
    const [address] = await window.ethereum //
      .request({ method: "eth_requestAccounts" });
    this.account = address;
    this.chainId = chain;
    return {
      account: this.account,
      provider: this.provider,
      chainId: this.chainId,
    };
  }
}
