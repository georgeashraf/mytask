import React, {useState, useContext} from 'react'
import {Navigate, useNavigate} from 'react-router-dom'
import cookie from 'js-cookie'
const Login = (props)=> {
  const navigate = useNavigate();

    const [values, setValues] = useState({
        email:"",
        password:"",
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
          const rawResponse = await fetch("/auth/login", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });
          const content = await rawResponse.json()
          console.log(content)
          cookie.set('token',content.token)
          cookie.set('role',content.role)
          if (content.msg){
            
            var element = document.getElementById("text-message");
            element.innerHTML=content.msg;
            var element = document.getElementById("success-alert");
            element.classList.remove("hidden");
          }
          else{
            let path = `/`;
            navigate(path);
          }
          

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
      <strong id="text-message"></strong> .
    </div>
        <form className="form-center form-style" onSubmit={formSubmit}>
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

          <button type="submit" className="btn btn-dark">login</button>
          
        </fieldset>
      </form>
      </>
    )
}

export default Login
