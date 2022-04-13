import { connectToWallet, disconnectWallet } from "@libs/Web3Helpers";
import { observer } from "mobx-react";
import React from "react";
import styled from "styled-components";
import { web3Store } from "../store/root.store";
import { Web3Status } from "../store/web3.store";
import { Login } from "./auth/Login";
import { Logout } from "./auth/Logout";
import { Loading } from "./Loading";
import { NoSSR } from "./other/NoSSR";

export const Navbar: React.FC = observer(() => {
  const onConnectWallet = async () => {
    await connectToWallet();
  };

  const onDisconnectWallet = async () => {
    await disconnectWallet();
  };

  const onRenderWalletButton = () => {
    switch (web3Store.status) {
      case Web3Status.Loading:
        return <Loading />;

      case Web3Status.Disconnected:
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
            <NoSSR>
              <div className="navbar-item">{onRenderWalletButton()}</div>
            </NoSSR>
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
