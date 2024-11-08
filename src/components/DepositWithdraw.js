import { useEffect, useState } from "react";
import Notification from "./Notification";

export default function DepositWithdraw({ accountDetails, dispatch }) {
  const [theAmount, setTheAmount] = useState(0);
  const [depositOrWithdraw, setDepositOrWithdraw] = useState(null);
  const [message, setMessage] = useState(null);
  const [notificationColor, setNotificationColor] = useState(null);
  const [theAccountBalance, setTheAccountBalance] = useState(
    accountDetails.accountBalance
  );
  const [triggerApi, setTriggerApi] = useState(false);

  useEffect(() => {
    if (!notificationColor) return;

    // async function getAccountDetails() {
    //   const url = `http://localhost:5000/bankApp/api/v1/account/${accountDetails._id}`;

    //   const requestOptions = {
    //     method: "GET",
    //   };

    //   try {
    //     const rawData = await fetch(url, requestOptions);
    //     const theData = await rawData.json();

    //     console.log(theData.data.accountBalance);
    //     setTheAccountBalance(theData.data.accountBalance);
    //   } catch (error) {
    //     console.log("False - Get Account Details API failed");
    //   }
    // }

    // getAccountDetails();

    const theTimeOut = setTimeout(() => {
      setNotificationColor(null);
    }, 3000);
  }, [notificationColor]);

  useEffect(() => {
    if (!triggerApi) return;

    async function getAccountDetails() {
      const url = `http://localhost:5000/bankApp/api/v1/account/${accountDetails._id}`;

      const requestOptions = {
        method: "GET",
      };

      try {
        const rawData = await fetch(url, requestOptions);
        const theData = await rawData.json();

        console.log(theData.data.accountBalance);
        setTheAccountBalance(theData.data.accountBalance);
      } catch (error) {
        console.log("False - Get Account Details API failed");
      }
    }

    getAccountDetails();
    setTriggerApi(false);
  }, [triggerApi]);

  function submitButton(e) {
    e.preventDefault();
    console.log(`You want to ${depositOrWithdraw} the amount of ${theAmount}`);

    if (
      depositOrWithdraw === "withdraw" &&
      theAmount > accountDetails.accountBalance
    ) {
      setMessage(`You have insufficient balance to withdraw ${theAmount}`);
      setNotificationColor("red");
      return;
    }

    async function putApiCall() {
      const url = `http://localhost:5000/bankApp/api/v1/account/${accountDetails._id}`;

      const content = {
        type: depositOrWithdraw,
        amount: theAmount,
      };

      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      };
      try {
        const rawData = await fetch(url, requestOptions);

        if (rawData.status === 200) {
          setMessage(`The ${depositOrWithdraw} of ${theAmount} is completed`);
          setNotificationColor("green");
          setTriggerApi(true);
          return;
        } else {
          setMessage("Something went wrong. Please try again Later");
          setNotificationColor("red");
          return;
        }
      } catch (error) {
        console.log("False - the put API failed");
        setMessage(error);
        setNotificationColor("red");
        return;
      }
    }

    putApiCall();
  }
  console.log(accountDetails);
  return (
    <div className="page">
      <div
        className="back-btn"
        onClick={() =>
          dispatch({ type: "MainPage", payLoad: accountDetails._id })
        }
      >
        ⬅
      </div>

      <div className="details-list border-bottom">
        <div className="list-item">
          <div className="label">
            Details of your account {accountDetails._id}
          </div>
        </div>

        <div className="list-item ">
          <div className="label">Current Balance:</div>
          <div className="item">{theAccountBalance}</div>
        </div>
      </div>

      <form>
        <div className="radio-buttons gap">
          <div className="the-radio-items">
            <input
              className="width"
              type="radio"
              name="depositWithdraw"
              value={"withdraw"}
              onClick={(e) => setDepositOrWithdraw(e.target.value)}
            />
            <div className="label"> Withdraw </div>
          </div>
          <div className="the-radio-items">
            <input
              className="width"
              type="radio"
              name="depositWithdraw"
              value={"deposit"}
              onClick={(e) => setDepositOrWithdraw(e.target.value)}
            />
            <div className="label">Deposit</div>
          </div>
        </div>

        {/* <select
          className="gap"
          onChange={(e) => setDepositOrWithdraw(e.target.value)}
        >
          <option value={"withdraw"}>Withdraw</option>
          <option value={"deposit"}>Deposit</option>
        </select> */}

        <div>
          <div className="label">Amount</div>
          <input
            type="number"
            value={theAmount}
            onChange={(e) => setTheAmount(e.target.value)}
            placeholder="Please put an amount"
            className="gap"
          />
        </div>

        <button className="btn" onClick={(e) => submitButton(e)}>
          Submit
        </button>
      </form>

      {notificationColor && (
        <Notification bgColor={notificationColor}>{message}</Notification>
      )}
    </div>
  );
}
