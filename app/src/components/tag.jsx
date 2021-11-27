import React, {useState, useEffect, useContext} from 'react'
import { useParams } from "react-router-dom";
import cookie from 'js-cookie'


const Tag = (props) => {
  const existingTokens = cookie.get('token');

    const params = useParams();
    const [tag, setTag] = useState({});
      const fetchData = async () => {
        const data = await fetch("/admin/tag/" + params.tagId,{
          ethod: 'GET',
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Authorization":existingTokens
            },
        });
        let json_data = await data.json();
        console.log(json_data)
        setTag(json_data.tag[0]);
      };
      const hidealert = ()=>{
        var element = document.getElementById("success-alert");
        element.classList.add("hidden");
      }
      let handleSubmit = (event) => {
        event.preventDefault();
        const postData = async () => {
            const rawResponse = await fetch("/admin/tag/" + params.tagId, {
              method: "PUT",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization":existingTokens
              },
              body: JSON.stringify(tag),
            });
            const content = await rawResponse.json();
            var element = document.getElementById("success-alert");
            element.classList.remove("hidden");
          };
          postData();
      };
      let handleChange = (e) => {
        setTag({
          ...tag,
          [e.target.name]: e.target.value,
        });
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
          <strong>Tag Changed Succesfully</strong> .
        </div>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label mt-4">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="name"
            name="name"
            value={tag.name}
            onChange={handleChange}
          />
        </div>
        <button className="button submit" type="submit">
          Submit
        </button>
      </form>
        </>
    )
}

export default Tag
