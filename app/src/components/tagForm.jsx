import React,{useState, useContext} from "react";
import cookie from 'js-cookie'


const TagForm = (props) => {
  const existingTokens = cookie.get('token');

    const [formValues, setFormValues] = useState([{ name: "" }]);
    const onInputchange = (event) => {
        setFormValues({
          ...formValues,
          [event.target.name]: event.target.value,
        });
      };
      const hidealert = ()=>{
        var element = document.getElementById("success-alert");
        element.classList.add("hidden");
      }
      let handleSubmit = (event) => {
        event.preventDefault();
        console.log(formValues)
        let json_obj = {
            "tags":formValues
        }
        const postData = async () => {
          const rawResponse = await fetch("/admin/tag", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Authorization":existingTokens
            },
            body: JSON.stringify(json_obj),
          });
          const content = await rawResponse.json();
          var element = document.getElementById("success-alert");
          element.classList.remove("hidden");
          // alert(content);
        };
        postData();
      };
      
      let addFormFields = () => {
        setFormValues([
          ...formValues,
          {
            name: "",
          },
        ]);
      };
      let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues);
      };
      let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
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
        <strong>Tag Added Succesfully</strong> .
      </div>

      <form onSubmit={handleSubmit}>
      <label htmlFor="tags" className="form-label mt-4">
        Tags
      </label>
      {formValues.map((element, index) => (
        <div className="form-inline" key={index}>
          <label>Tag name</label>
          <input
            type="text"
            name="name"
            value={element.name || ""}
            onChange={(e) => handleChange(index, e)}
          />
          {index ? (
            <button
              type="button"
              className="button remove"
              onClick={() => removeFormFields(index)}
            >
              Remove
            </button>
          ) : null}
        </div>
      ))}
         <button
          className="button add"
          type="button"
          onClick={() => addFormFields()}
        >
          Add
        </button>
        <button className="button submit" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default TagForm;
