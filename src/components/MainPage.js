import { useEffect, useState } from "react";

export default function MainPage({ accountId, dispatch, userDetails }) {
  const [theData, setTheData] = useState(null);
  const [theAccountId, setTheAccountId] = useState(accountId);

  console.log(userDetails);

  useEffect(() => {
    async function getAccountDetails() {
      const url = `http://localhost:5000/bankApp/api/v1/account/${theAccountId}`;
      const requestOptions = {
        method: "GET",
      };

      try {
        const rawData = await fetch(url, requestOptions);
        const finalData = await rawData.json();

        setTheData(finalData);

        // console.log(finalData);
        console.log(finalData.data.accountBalance);
      } catch (error) {
        console.log("False - useEffect API did not work in MainPage");
      }
    }

    getAccountDetails();
  }, [theAccountId]);

  // if (!theData) return <div>......LOADING</div>;

  return (
    <>
      {!theData ? (
        <div>......LOADING</div>
      ) : (
        <div className="page">
          <div className="border-bottom">
            <div className="label gap">Hi there {userDetails.name}....</div>
            <div className="label gap">All your accounts</div>
            {userDetails.accounts.map((i) => (
              <div
                className="account-list"
                key={i.accountId}
                onClick={() => setTheAccountId(i.accountId)}
              >
                {i.accountId}
              </div>
            ))}
          </div>

          <div className="details-list">
            <div className="list-item">
              <div className="label">
                Details of your account {theData.data._id}
              </div>
              {/* <div className="item">{theData.data._id}</div> */}
            </div>
            <div className="list-item">
              <div className="label">Account Start Date:</div>
              <div className="item">{theData.data.accountStartDate}</div>
            </div>
            <div className="list-item">
              <div className="label">Account Balance:</div>
              <div className="item">{theData.data.accountBalance}</div>
            </div>
            <div className="list-item">
              <div className="label">Loan amount:</div>
              <div className="item">{theData.data.loanAmount}</div>
            </div>
          </div>

          <div className="options">
            <div
              className="option"
              onClick={() =>
                dispatch({ type: "DepositWithdraw", payLoad: theData.data })
              }
            >
              Deposit/Withdraw Money
            </div>
            <div
              className="option"
              onClick={() =>
                dispatch({ type: "LoansPage", payLoad: theData.data })
              }
            >
              Loan related
            </div>
            <div
              className="option"
              onClick={() => dispatch({ type: "LogInForm" })}
            >
              Sign Out
            </div>
          </div>
          {/* <p>This is your main page</p> */}
        </div>
      )}
    </>
  );
}
