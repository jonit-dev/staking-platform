import { contractsStore } from "@store/root.store";
import { observer } from "mobx-react";
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
          <label className="label">DAI Balance</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={daiTokenBalance}
              readOnly
            />
          </div>
        </div>
        <div className="field">
          <label className="label">dAppToken Balance</label>
          <div className="control">
            <input
              className="input"
              type="text"
              value={dappTokenBalance}
              readOnly
            />
          </div>
        </div>
        <StakedTag className="tag">
          Staked DAI Balance: {stakedBalance}
        </StakedTag>

        <Button
          label="Stake DAI"
          className="is-medium is-fullwidth"
          onClick={onStakeDAI}
        />
      </div>
    </Container>
  );
});

const Container = styled.div``;

const StakedTag = styled.span`
  margin-bottom: 1rem;
`;
