import { contractsStore } from "@store/root.store";
import dappTokenIcon from "cryptocurrency-icons/32/white/abt.png";
import daiIcon from "cryptocurrency-icons/32/white/dai.png";
import { observer } from "mobx-react";
import Image from "next/image";
import { FormEvent } from "react";
import styled from "styled-components";
import { Button } from "./Button";

import { uiColors } from "@constants/colors";
import { stakeTokens, unStakeTokens } from "@libs/StakingHelpers";
import { showError } from "@libs/ToastHelpers";

export const StakingBox: React.FC = observer(() => {
  const { DAIToken, DappToken, TokenFarm } = contractsStore;
  const balances = contractsStore.balances;

  const onStakeDAI = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (!DAIToken) {
        throw new Error("Failed to load DAIToken");
      }

      if (!TokenFarm) {
        throw new Error("Failed to load TokenFarm");
      }
      await stakeTokens(DAIToken, TokenFarm, balances.DAIToken);
    } catch (error) {
      showError(error.message);
    }
  };

  const onUnStakeDAI = async (e: FormEvent) => {
    e.preventDefault();
    if (!DAIToken) {
      throw new Error("Failed to load DAIToken");
    }

    if (!TokenFarm) {
      throw new Error("Failed to load TokenFarm");
    }
    await unStakeTokens(DAIToken, TokenFarm, balances.staked);
  };

  return (
    <Container className="box">
      <form>
        <div className="field">
          <label className="label">Staked DAI</label>
          <div className="control has-icons-right">
            <input
              className="input transparent"
              type="text"
              value={balances.staked}
              readOnly
            />

            <span className="icon is-medium is-right">
              <Image src={daiIcon} width={24} height={24} alt="dai icon" />
            </span>
          </div>
        </div>
        <div className="field">
          <label className="label">dAppToken Balance</label>
          <div className="control has-icons-right">
            <input
              className="input transparent"
              type="text"
              value={balances.DappToken}
              readOnly
            />

            <span className="icon is-medium is-right">
              <Image
                src={dappTokenIcon}
                width={24}
                height={24}
                alt="dai icon"
              />
            </span>
          </div>
        </div>

        <StakedTag className="tag">DAI Balance: {balances.DAIToken}</StakedTag>

        {balances.DAIToken > 0 ? (
          <Button
            label="Stake DAI"
            className="is-medium is-fullwidth"
            onClick={onStakeDAI}
          />
        ) : (
          <p className="small">To stake, add some DAI to your metamask.</p>
        )}

        {balances.staked > 0 && (
          <>
            <br />
            <Button
              label="UnStake DAI"
              className="is-medium is-fullwidth"
              onClick={onUnStakeDAI}
            />
          </>
        )}
      </form>
    </Container>
  );
});

const Container = styled.div`
  .transparent {
    background-color: transparent;
    border: none;
    color: white;
  }

  .small {
    font-size: 0.8rem;
    color: ${uiColors.gray};
  }
`;

const StakedTag = styled.span`
  margin-bottom: 1rem;
`;
