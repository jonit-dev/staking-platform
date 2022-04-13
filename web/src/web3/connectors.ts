import { Connectors } from "web3-react";
import { appEnv } from "../constants/appEnv";
const { InjectedConnector, NetworkOnlyConnector } = Connectors;

const MetaMask = new InjectedConnector({
  //1337 is the Ganache chain ID
  supportedNetworks: [1, 4, 1337],
});

const Infura = new NetworkOnlyConnector({
  providerURL: appEnv.web3.infuraUrl,
});

export const connectors = { MetaMask, Infura };
