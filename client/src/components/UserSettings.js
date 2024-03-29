import { useState, useEffect } from "react";

function UserSettings({ onLogin, user }) {
  const [userFullName, setUserFullName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [profPicUrl, setProfPicUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) { 
    setUserFullName(user.name)
    setUserEmail(user.email)
    setProfPicUrl(user.prof_pic_url)
    setUsername(user.username)
    }
  }, [user]);


  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/edit", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userFullName,
        email: userEmail,
        prof_pic_url: profPicUrl,
        username
      }),
    }).then((resp) => {
      setIsLoading(false);
      if (resp.ok) {
        resp.json().then((user) => onLogin(user));
      } else {
        resp.json().then((data) => setErrors(data.errors));
        console.log(errors)
      }
    });
  }

  return (
    <div id="settings-container">
      <h1 className="title">Edit User Info</h1>
      <div className="form">
      <form onSubmit={handleSubmit}>
      <div className="input">
        <label>
          Full Name:{" "}
          <input
            type="text"
            className="user-full-name"
            autoComplete="off"
            value={userFullName}
            onChange={(e) => setUserFullName(e.target.value)}
          ></input>
        </label></div>
        <div className="input">
        <label>
          Email:{" "}
          <input
            type="text"
            className="user-email"
            autoComplete="off"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          ></input>
        </label></div>
        <div className="input">
        <label>
          Profile Picture:{" "}
          <input
            type="text"
            className="prof-pic-url"
            autoComplete="off"
            value={profPicUrl}
            onChange={(e) => setProfPicUrl(e.target.value)}
          ></input>
        </label></div>
        <div className="input">
        <label>
          Username:{" "}
          <input
            type="text"
            className="username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </label></div>
        <div className="button-submit">
        <button type="submit">{isLoading ? "Loading..." : "Update"}</button></div>
      </form></div>
      {/* <div className="error-wrapper">{errors.length > 0 && errors.map((error)=> <p>{error}</p>)}</div> */}
    </div>
  );
}

export default UserSettings;
