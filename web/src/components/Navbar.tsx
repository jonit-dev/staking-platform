import { observer } from "mobx-react";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useWeb3Context } from "web3-react";
import { showError } from "../libs/ToastHelpers";
import { web3Store } from "../store/root.store";
import { Web3Status } from "../store/web3.store";
import { Login } from "./auth/Login";
import { Logout } from "./auth/Logout";

interface IProps {}

export const Navbar: React.FC<IProps> = observer((props) => {
  const context = useWeb3Context();

  useEffect(() => {
    console.log(context);

    if (context?.account && context?.active) {
      console.log(context);
      web3Store.setAccount(context.account);
      web3Store.setStatus(Web3Status.Connected);
    }
  }, [context]);

  const onConnectWallet = async () => {
    try {
      await context.setConnector("MetaMask", {
        suppressAndThrowErrors: true,
      });
      web3Store.setStatus(Web3Status.Loading);
    } catch (error: any) {
      switch (error.code) {
        case "ETHEREUM_ACCESS_DENIED":
          showError("Please accept your Metamask request to proceed");
          break;
        default:
          showError("Oops! Failed to connect to your Metamask wallet");
          break;
      }

      context.unsetConnector();
    }
  };

  const onDisconnectWallet = () => {
    context.unsetConnector();
  };

  const onRenderWalletButton = () => {
    switch (web3Store.currentStatus) {
      case Web3Status.NotLoaded:
        return <Login onClick={onConnectWallet} />;
      case Web3Status.Connected:
        return <Logout onClick={onDisconnectWallet} />;
    }
  };

  return (
    <NavbarContainer>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            <img
              src="https://bulma.io/images/bulma-logo-white.png"
              width={112}
              height={28}
            />
          </a>
          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item">Home</a>
            <a className="navbar-item">Documentation</a>
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">More</a>
              <div className="navbar-dropdown">
                <a className="navbar-item">About</a>
                <a className="navbar-item">Jobs</a>
                <a className="navbar-item">Contact</a>
                <hr className="navbar-divider" />
                <a className="navbar-item">Report an issue</a>
              </div>
            </div>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">{onRenderWalletButton()}</div>
          </div>
        </div>
      </nav>
    </NavbarContainer>
  );
});

const NavbarContainer = styled.div`
  .navbar {
    min-height: 4.25rem;
  }
`;
