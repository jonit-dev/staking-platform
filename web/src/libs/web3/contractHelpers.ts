import { showError } from "@libs/ToastHelpers";

import { Contract } from "web3-eth-contract";

export const getContract = (name: string): Contract | undefined => {
  try {
    const { web3 } = window;

    const contract = require(`../../contracts/${name}.json`);

    const { abi, address, network } = contract;

    //! ID Mismatch check. verify!
    // if (web3Store.network?.id !== network.chainId) {
    //   throw new Error(
    //     `Please, connect to ${network.name} to interact with this Smart Contract`
    //   );
    // }

    return new web3.eth.Contract(abi, address);
  } catch (error) {
    showError(error.message);
  }
};
