import type { NextPage } from "next";
import { useEffect } from "react";
import { useWeb3Context } from "web3-react";
import { Page } from "../components/Page";

const Home: NextPage = () => {
  const context = useWeb3Context();

  useEffect(() => {
    console.log(context.account);
  }, []);

  return (
    <Page>
      <h1>hi</h1>
    </Page>
  );
};

export default Home;
