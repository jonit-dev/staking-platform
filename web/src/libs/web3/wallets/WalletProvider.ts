export interface IWalletProvider {
  isInstalled: () => void;
  isCorrectNetwork: () => void;
  isConnected: () => Promise<boolean>;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
}
