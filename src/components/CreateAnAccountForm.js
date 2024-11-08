export default function CreateAnAccountForm({ userDetails, dispatch }) {
  const theAccounts = userDetails.accounts;

  return (
    <div>
      <div className="back-btn" onClick={() => dispatch({ type: "LogInForm" })}>
        ⬅
      </div>
      {theAccounts.length === 0 ? (
        <div>
          <p> We see you have no accounts </p>{" "}
        </div>
      ) : (
        <div>
          <p>
            We see you have the below accounts. Click on one of them to proceed:
          </p>
          {theAccounts.map((i) => (
            <div
              className="account-list"
              key={i.accountId}
              onClick={() =>
                dispatch({ type: "MainPage", payLoad: i.accountId })
              }
            >
              {i.accountId}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
