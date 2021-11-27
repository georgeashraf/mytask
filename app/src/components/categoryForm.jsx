import React, { useState, useContext } from "react";


const CategoryForm = (props) => {

  const [formValues, setFormValues] = useState([{ name: "", description: "" }]);
  const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState(false);

	const fileHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};
  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([
      ...formValues,
      {
        name: "",
        description: "",
        subcategory_name: "",
        subcategory_description: "",
      },
    ]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };
  const hidealert = ()=>{
    var element = document.getElementById("success-alert");
    element.classList.add("hidden");
  }
  let handleSubmit = (event) => {
    event.preventDefault();
    let json_obj = {
      name: "",
      description: "",
      subcategories: [],
    };
    json_obj.name = formValues[0].name;
    json_obj.description = formValues[0].description;

    formValues.forEach((element) => {
      if (
        element.subcategory_name != "" &&
        element.subcategory_name != undefined &&
        element.subcategory_description != "" &&
        element.subcategory_description != undefined
      )
        json_obj.subcategories.push({
          name: element.subcategory_name,
          description: element.subcategory_description,
        });
    });
    const postData = async () => {
      const rawResponse = await fetch("/admin/category", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(json_obj),
      });
      const content = await rawResponse.json();
      const formData = new FormData();

      formData.append('file', selectedFile);
      if (content.category){
        const f = await fetch(
          '/admin/file_upload_category/' + content.category.id,
          {
            method: 'POST',
            body: formData,
          }
        )
      }
      var element = document.getElementById("success-alert");
      element.classList.remove("hidden");
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
    <strong>Category Created Succesfully</strong> .
  </div>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name" className="form-label mt-4">
          Name
        </label>
        <input
          type="name"
          className="form-control"
          id="name"
          placeholder="name"
          name="name"
          value={formValues.name}
          onChange={(e) => handleChange(0, e)}
          required={true}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description" className="form-label mt-4">
          Description
        </label>
        <input
          type="description"
          className="form-control"
          id="description"
          placeholder="description"
          name="description"
          value={formValues.description}
          onChange={(e) => handleChange(0, e)}
          required={true}
        />
      </div>
      <label htmlFor="subcategories" className="form-label mt-4">
        Subcategories
      </label>
      {formValues.map((element, index) => (
        <div className="form-inline" key={index}>
          <label>subcategory name</label>
          <input
            type="text"
            name="subcategory_name"
            value={element.subcategory_name || ""}
            onChange={(e) => handleChange(index, e)}
          />
          <label>subcategory description</label>
          <input
            type="text"
            name="subcategory_description"
            value={element.subcategory_description || ""}
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
      <div className="button-section">
        <button
          className="button add btn btn-dark"
          type="button"
          onClick={() => addFormFields()}
        >
          Add
        </button>
        <div>
          Image:
          <input type="file" name="file" onChange={fileHandler} />
			{isSelected ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
        </div>
  
        <button className="button submit btn btn-dark" type="submit">
          Submit
        </button>
      </div>
    </form>
    </>
  );
};

export default CategoryForm;
