import React, { useState, useContext } from "react";
import cookie from 'js-cookie'

const AdminForm = (props) => {
  const existingTokens = cookie.get('token');

  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    role: "admin",
  });

  let handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };
  const hidealert = ()=>{
    var element = document.getElementById("success-alert");
    element.classList.add("hidden");
  }
  let handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
    const postData = async () => {
      const rawResponse = await fetch("/auth/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization":existingTokens
        },
        body: JSON.stringify(formValues),
      });
      const content = await rawResponse.json();
      var element = document.getElementById("success-alert");
      element.classList.remove("hidden");
      // alert(content);
    };
    postData();
  };

  return (
    <>
      <div
        className="alert alert-dismissible alert-success hidden"
        id="success-alert"
      >
       <button
        type="button"
        className="btn-close"
        // data-bs-dismiss="alert"
        onClick={hidealert}
      ></button>
        <strong>Admin Created Succesfully</strong> .
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username" className="form-label mt-4">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="username"
            name="username"
            value={formValues.username}
            onChange={(e) => handleChange(e)}
            required={true}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label mt-4">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="email"
            name="email"
            value={formValues.email}
            onChange={(e) => handleChange(e)}
            required={true}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label mt-4">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="password"
            name="password"
            value={formValues.password}
            onChange={(e) => handleChange(e)}
            required={true}
          />
        </div>
        <div class="form-group">
          <fieldset>
            <label class="form-label mt-4" for="readOnlyInput">
              Role
            </label>
            <input
              class="form-control"
              id="readOnlyInput"
              type="text"
              placeholder="admin"
              readonly=""
            />
          </fieldset>
        </div>
        <button className="button submit btn btn-dark" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default AdminForm;
