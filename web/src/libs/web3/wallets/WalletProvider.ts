export interface IWalletProvider {
  isInstalled: () => void;
  isConnected: () => Promise<boolean>;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  getAccounts: () => Promise<string[] | undefined>;
}
