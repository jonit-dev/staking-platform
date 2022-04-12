/* eslint-disable no-undef */
/* eslint-disable node/no-unpublished-import */
import { utils } from "ethers";

export const ToToken = (amount: string) => utils.parseEther(amount);
