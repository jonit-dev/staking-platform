import { Connectors } from "web3-react";
import { appEnv } from "../constants/appEnv";
const { InjectedConnector, NetworkOnlyConnector } = Connectors;

const MetaMask = new InjectedConnector({ supportedNetworks: [1, 4] });

const Infura = new NetworkOnlyConnector({
  providerURL: appEnv.web3.infuraUrl,
});

export const connectors = { MetaMask, Infura };
