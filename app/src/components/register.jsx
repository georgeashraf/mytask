import React, {useState} from "react";


const Register = () => {
    const [values, setValues] = useState({
        email:"",
        password:"",
        role:"user"
    });
    const handleChange=(event) =>{
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    }
    const hidealert = ()=>{
      var element = document.getElementById("success-alert");
      element.classList.add("hidden");
    }
    const formSubmit = (event) =>{
        event.preventDefault();
        const postData = async () => {
          const rawResponse = await fetch("/auth/register", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });
       
          var element = document.getElementById("success-alert");
          element.classList.remove("hidden");
        };
        postData();
      
    }
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
    <strong>User Registered Succesfully</strong> .
  </div>
    <div className="form-style"> 
      <form className="form-center " onSubmit={formSubmit}>
        <fieldset>
          <legend>Legend</legend>
          <div className="form-group">
            <label htmlFor="email" className="form-label mt-4">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label mt-4">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="role" className="form-label mt-4">
              Role
            </label>
            <select className="form-select" id="role" name="role" value={values.role} onChange={handleChange}>
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
          </div>
          <button type="submit" className="btn btn-dark">Register</button>
        </fieldset>
      </form>
    </div>
    </>
  );
  
};

export default Register;
