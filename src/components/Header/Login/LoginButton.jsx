import { render } from "@testing-library/react";
import React from "react";
import { useMoralis } from "react-moralis";
import {Button} from '../../Button'

function Login() { 
    const { authenticate, isAuthenticated, isAuthenticating, user, account, logout } = useMoralis();

      // console.log("authenticate = " + authenticate)
      // console.log("isAuthenticated = " + isAuthenticated)
      // console.log("isAuthenticating = " + isAuthenticating)
      // console.log("user = " + user)
      // console.log("account = " + account)
      // console.log("logout = " + logout)

    const login = async () => {
      if (!isAuthenticated) {

        await authenticate({signingMessage: "Log in using Moralis" })
          .then(function (user) {
            console.log("logged in user:", user);
            console.log(user.get("ethAddress"));
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }

    const logOut = async () => {
      await logout();
      console.log("logged out");
    }

    return (
      isAuthenticated ?
      <div className="Login">
        <Button onClick={logOut} disabled={isAuthenticating}>Logout Metamask</Button>
      </div>
      :
      <div className="Login">
        <Button onClick={login}>Metamask Login</Button>
      </div>
    )

}

export default Login;