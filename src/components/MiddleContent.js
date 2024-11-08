import { useReducer } from "react";
import LogInForm from "./LogInForm";
import CreateUserForm from "./CreateUserForm";
import CreateAnAccountForm from "./CreateAnAccountForm";
import MainPage from "./MainPage";
import DepositWithdraw from "./DepositWithdraw";
import LoansPages from "./LoansPage";

const initialState = {
  currentScreen: "LogInForm",
  userDetails: {},
  accountId: null,
  backButton: null,
  accountDetails: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "LogInForm":
      return { ...state, currentScreen: "LogInForm" };

    case "CreateUserForm":
      return {
        ...state,
        currentScreen: "CreateUserForm",
      };

    case "CreateAnAccountForm":
      return {
        ...state,
        currentScreen: "CreateAnAccountForm",
        userDetails: action.payLoad,
      };

    case "MainPage":
      return { ...state, currentScreen: "MainPage", accountId: action.payLoad };

    case "DepositWithdraw":
      return {
        ...state,
        currentScreen: "DepositWithdraw",
        accountDetails: action.payLoad,
      };

    case "LoansPage":
      return {
        ...state,
        currentScreen: "LoansPage",
        accountDetails: action.payLoad,
      };

    default:
      break;
  }
}

export default function MiddleContent() {
  const [
    { currentScreen, userDetails, accountId, backButton, accountDetails },
    dispatch,
  ] = useReducer(reducer, initialState);

  return (
    <div className="middle-content">
      {currentScreen === "LogInForm" && <LogInForm dispatch={dispatch} />}
      {currentScreen === "CreateUserForm" && (
        <CreateUserForm dispatch={dispatch} />
      )}
      {currentScreen === "CreateAnAccountForm" && (
        <CreateAnAccountForm userDetails={userDetails} dispatch={dispatch} />
      )}
      {currentScreen === "MainPage" && (
        <MainPage
          accountId={accountId}
          dispatch={dispatch}
          userDetails={userDetails}
        />
      )}

      {currentScreen === "DepositWithdraw" && (
        <DepositWithdraw accountDetails={accountDetails} dispatch={dispatch} />
      )}

      {currentScreen === "LoansPage" && (
        <LoansPages dispatch={dispatch} accountDetails={accountDetails} />
      )}
    </div>
  );
}
