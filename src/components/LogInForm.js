import { useState } from "react";
import Notification from "./Notification";

export default function LogInForm({ dispatch }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [message, setMessage] = useState("");

  function submitClicked(e) {
    e.preventDefault();
    // console.log(`The Name is ${name} and the email is ${email}`);

    const url = `http://localhost:5000/bankApp/api/v1/user/${email}`;
    const requestOptions = {
      method: "GET",
    };
    let theData;

    async function getUser() {
      try {
        const rawData = await fetch(url, requestOptions);

        theData = await rawData.json();

        if (rawData.status === 404) {
          setMessage(theData.data);
          setShowNotification(true);
          return;
        }
        console.log("The API worked");
        console.log(theData.data);

        dispatch({ type: "CreateAnAccountForm", payLoad: theData.data });
      } catch (error) {
        console.log("The API did not work");
        console.log(error);
      }
    }

    getUser();
  }

  function createAccountClicked(e) {
    e.preventDefault();
    dispatch({ type: "CreateUserForm" });
  }

  return (
    <div>
      <form className="log-in-form">
        <input
          type="text"
          value={name}
          placeholder="Your user name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={email}
          placeholder="Your regsitered email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="btn" onClick={(e) => submitClicked(e)}>
          Submit
        </button>

        <button className="btn" onClick={(e) => createAccountClicked(e)}>
          Create Account
        </button>
      </form>

      {showNotification && (
        <Notification bgColor={"red"}>{message}</Notification>
      )}
    </div>
  );
}
