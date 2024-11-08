import { useEffect, useState } from "react";

export default function MainPage({ accountId }) {
  const [theData, setTheData] = useState(null);
  const [loading, setLoading] = useState(true); // To manage the loading state

  useEffect(() => {
    async function getAccountDetails() {
      const url = `http://localhost:5000/bankApp/api/v1/account/${accountId}`;
      const requestOptions = {
        method: "GET",
      };

      try {
        const rawData = await fetch(url, requestOptions);
        const finalData = await rawData.json();

        setTheData(finalData);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.log("Error - useEffect API did not work in MainPage", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    }

    getAccountDetails();
  }, [accountId]);

  if (loading) return <div>......LOADING</div>;
  if (!theData) return <div>No Data Available</div>; // Handle case where there's no data

  return (
    <div className="main-page">
      <div className="details-list">
        <div className="list-item">
          <div className="label">Account Number:</div>
          <div className="item">{theData.data._id}</div>
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
        <div className="option">Deposit/Withdraw Money</div>
        <div className="option">Loan related</div>
        <div className="option">Sign Out</div>
      </div>
    </div>
  );
}
