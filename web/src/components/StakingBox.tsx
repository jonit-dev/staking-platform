import { contractsStore } from "@store/root.store";
import dappTokenIcon from "cryptocurrency-icons/32/white/abt.png";
import daiIcon from "cryptocurrency-icons/32/white/dai.png";
import { observer } from "mobx-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "./Button";

import { fromWei } from "web3-utils";

export const StakingBox: React.FC = observer(() => {
  const { DAIToken, DappToken, staked } = contractsStore.balances;

  const [daiTokenBalance, setDaiTokenBalance] = useState(0);
  const [dappTokenBalance, setDappTokenBalance] = useState(0);
  const [stakedBalance, setStakedBalance] = useState(0);

  useEffect(() => {
    setDaiTokenBalance(Number(fromWei(String(DAIToken))));
    setDappTokenBalance(Number(fromWei(String(DappToken))));
    setStakedBalance(Number(fromWei(String(staked))));
  }, [DAIToken, DappToken, staked]);

  const onStakeDAI = async () => {};

  return (
    <Container className="box">
      <div>
        <div className="field">
          <label className="label">Staked DAI</label>
          <div className="control has-icons-right">
            <input
              className="input transparent"
              type="text"
              value={stakedBalance}
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
              value={dappTokenBalance}
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

        <StakedTag className="tag">DAI Balance: {daiTokenBalance}</StakedTag>

        <Button
          label="Stake DAI"
          className="is-medium is-fullwidth"
          onClick={onStakeDAI}
        />
      </div>
    </Container>
  );
});

const Container = styled.div`
  .transparent {
    background-color: transparent;
    border: none;
    color: white;
  }
`;

const StakedTag = styled.span`
  margin-bottom: 1rem;
`;
