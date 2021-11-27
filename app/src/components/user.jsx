import React, {useState, useEffect, useContext} from 'react'
import { useParams } from "react-router-dom";
import cookie from 'js-cookie'

const User = (props)=> {
    const params = useParams();
    const existingTokens = cookie.get('token');

    const [user, setUser] = useState({});
      const fetchData = async () => {
        const data = await fetch("/admin/user/" + params.userId,{
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization":existingTokens
          }
        });
        let json_data = await data.json();
        setUser(json_data.users[0]);
        // console.log("subcaategory");
        // var cat_arr = json_data.category;
        // let category = {
        //   name: cat_arr[0].name,
        //   description: cat_arr[0].description,
        // };
        // setCategory(category);
      };
    
      let handleChange = (e) => {
        setUser({
          ...user,
          [e.target.name]: e.target.value,
        });
      };
      const hidealert = ()=>{
        var element = document.getElementById("success-alert");
        element.classList.add("hidden");
      }
      let handleSubmit = (event) => {
        event.preventDefault();
        const postData = async () => {
            const rawResponse = await fetch("/admin/user/" + params.userId, {
              method: "PUT",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization":existingTokens
              },
              body: JSON.stringify(user),
            });
            const content = await rawResponse.json();
            var element = document.getElementById("success-alert");
            element.classList.remove("hidden");
          };
          postData();
      };
      useEffect(() => {
        fetchData();
      }, []);

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
          <strong>User Status Changed Succesfully</strong> .
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
            readonly=""
            value={user.username}
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
            readonly=""
            value={user.email}
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
              placeholder="user"
              readonly=""
              value={user.role}
            />
          </fieldset>
          <div className="form-group">
            <label htmlFor="role" className="form-label mt-4">
              Status
            </label>
            <select className="form-select" id="status" name="status" value={user.status} onChange={handleChange}>
              <option value="active">active</option>
              <option value="blocked">blocked</option>
            </select>
          </div>
        </div>
        <button className="button submit btn btn-dark" type="submit">
          Submit
        </button>
      </form>
        </>
        
    )
}

export default User
