import { useEffect, useState } from "react";
import Notification from "./Notification";

export default function LoansPages({ dispatch, accountDetails }) {
  const [theLoanTaken, setTheLoantaken] = useState(accountDetails.loanTaken);
  const [theLoanAmount, setTheLoanAmount] = useState(accountDetails.loanAmount);
  const [theAmount, setTheAmount] = useState(0);
  const [notificationColor, setNotificationColor] = useState(null);
  const [message, setMessage] = useState(null);
  const [triggerApi, setTriggerApi] = useState(false);
  const [theAccountBalance, setTheAccountBalance] = useState(
    accountDetails.accountBalance
  );

  useEffect(() => {
    if (!notificationColor) return;

    const timeOut = setTimeout(() => {
      setTriggerApi(false);
      setNotificationColor(null);
    }, 5000);
  }, [notificationColor]);

  useEffect(() => {
    if (!triggerApi) return;

    console.log("Get account details about to be triggered");

    async function getAccountDetails() {
      const url = `http://localhost:5000/bankApp/api/v1/account/${accountDetails._id}`;

      const requestOptions = {
        method: "GET",
      };

      try {
        const rawData = await fetch(url, requestOptions);

        const theData = await rawData.json();

        console.log("True - getAccountDetails success");

        setTheLoantaken(theData.data.loanTaken);
        setTheLoanAmount(theData.data.loanAmount);
        setTheAccountBalance(theData.data.accountBalance);
      } catch (error) {
        console.log("False - getAccountDetails function failed");
      }
    }

    getAccountDetails();

    console.log("Get account details triggered");
  }, [triggerApi]);

  function submitButton(e) {
    e.preventDefault();

    console.log(`${theAmount} for a Loan`);

    async function addLoan() {
      const url = `http://localhost:5000/bankApp/api/v1/account/${accountDetails._id}`;

      const content = {
        type: "getLoan",
        loanAmount: theAmount,
      };

      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      };

      try {
        const rawData = await fetch(url, requestOptions);

        if (rawData.status !== 200) {
          setMessage("Issue with loan application");
          setNotificationColor("red");
          return;
        } else {
          setTriggerApi(true);
          setMessage("Loan Application successful");
          setNotificationColor("green");
        }
      } catch (error) {
        console.log("False - addLoan function did not work");
        console.log(error);
      }
    }

    addLoan();
  }

  function payLoanButton(e) {
    e.preventDefault();

    if (theLoanAmount > theAccountBalance) {
      setMessage("Insufficient Balance to repay full loan");
      setNotificationColor("red");
      return;
    }

    async function payloan() {
      const url = `http://localhost:5000/bankApp/api/v1/account/${accountDetails._id}`;

      const content = {
        type: "payLoan",
      };

      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      };

      const rawData = await fetch(url, requestOptions);

      if (rawData.status === 200) {
        setMessage("Loan paid");
        setNotificationColor("green");
        setTriggerApi(true);
        return;
      } else {
        setMessage("Issue with paying loan");
        setNotificationColor("red");
        return;
      }
    }

    payloan();
  }

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
          {theLoanTaken ? (
            <div className="label">Loan taken</div>
          ) : (
            <div className="label">No Loan taken</div>
          )}
        </div>

        {theLoanTaken ? (
          <div className="list-item ">
            <div className="label">Loan Amount:</div>
            <div className="item">{theLoanAmount}</div>
          </div>
        ) : (
          <div></div>
        )}
      </div>

      {theLoanTaken ? (
        <div>
          {" "}
          <div className="label">A Loan is already taken</div>{" "}
          <form>
            <div className="label">Pay Loan</div>
            <button className="btn" onClick={(e) => payLoanButton(e)}>
              Pay loan
            </button>
          </form>
        </div>
      ) : (
        <form>
          <div>
            <div className="label"> Loan Amount</div>
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
      )}

      {notificationColor && (
        <Notification bgColor={notificationColor}>{message}</Notification>
      )}
    </div>
  );
}
