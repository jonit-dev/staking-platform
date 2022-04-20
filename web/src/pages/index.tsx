import { Page } from "@components/Page";
import { StakingBox } from "@components/StakingBox";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Page>
      <StakingBox />
    </Page>
  );
};

export default Home;
