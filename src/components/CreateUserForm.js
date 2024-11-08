import { useState } from "react";

import { format } from "date-fns";
import Notification from "./Notification";

export default function CreateUserForm({ dispatch }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState("");

  function createAccountButton(e) {
    e.preventDefault();

    console.log(`The name is ${name} and the email is ${email}`);

    const url = "http://localhost:5000/bankApp/api/v1/user";

    const theContent = {
      name: name,
      email: email,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(theContent),
    };

    async function createUser() {
      try {
        const rawData = await fetch(url, requestOptions);
        console.log(rawData);

        const theData = await rawData.json();

        if (rawData.status !== 200) {
          console.log(theData);
          setMessage("This email already exists");
          setShowNotification(true);
          return;
        }

        console.log("User created");
        console.log(theData);

        //------
        const todaysDate = new Date();
        const formattedDate = format(todaysDate, "yyyy-MM-dd");
        console.log(formattedDate);

        const anotherURL = "http://localhost:5000/bankApp/api/v1/account";

        const anotherContent = {
          userId: theData.data._id,
          accountBalance: 0,
          accountStartDate: formattedDate,
        };

        const anotherRequestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(anotherContent),
        };

        const rawData2 = await fetch(anotherURL, anotherRequestOptions);

        const thirdURL = `http://localhost:5000/bankApp/api/v1/user/${email}`;
        const thirdRequestOptions = {
          method: "GET",
        };

        const rawData3 = await fetch(thirdURL, thirdRequestOptions);

        const finalData = await rawData3.json();

        dispatch({ type: "CreateAnAccountForm", payLoad: finalData.data });
      } catch (error) {
        console.log("False - issue in createUserForm");
        console.log(error);
      }
    }

    createUser();
  }

  return (
    <div>
      <div
        className="back-btn gap"
        onClick={() => dispatch({ type: "LogInForm" })}
      >
        ⬅
      </div>

      <form className="log-in-form">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Please provide your name"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Provide your email Id"
        />

        <button className="btn" onClick={(e) => createAccountButton(e)}>
          Create Account
        </button>
      </form>
      {showNotification && (
        <Notification bgColor={"red"}>{message}</Notification>
      )}
    </div>
  );
}
