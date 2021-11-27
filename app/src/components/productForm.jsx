import React, { useState, useEffect, useContext } from "react";
import { MultiSelect } from "react-multi-select-component";
import cookie from 'js-cookie'


const ProductForm = (props) => {
  const existingTokens = cookie.get('token');

  const [tags, setTags] = useState([]);
  const [options, setOptions] = useState([]);


  const [selected, setSelected] = useState([]);

  const [formValues, setFormValues] = useState(
    { name: "", description: "", price: 0,subcategoryID:"" }
  );
  const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState(false);

	const fileHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

  const [subcategory, setSubcategory] = useState([]);
  const fetchData = async () => {
    const data = await fetch("/admin/subcategories/",  {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization":existingTokens
    }
  });
    let json_data = await data.json();
    console.log('subcategory')
    console.log(json_data)

    setSubcategory(...subcategory, json_data.subcategories);
    // setOptions({label:"n",value:"n"});
  };
  const hidealert = ()=>{
    var element = document.getElementById("success-alert");
    element.classList.add("hidden");
  }
  const fetchtags = async () => {
    const data = await fetch("/admin/tags/",{
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization":existingTokens
      }
    });
    let json_data = await data.json();
    // console.log(json_data);
    var options_arr = []
    json_data.tags.forEach(element => {
      let obj={
        label:"",
        value:""
      }
      obj.label = element.name
      obj.value = element.id
      options_arr.push(obj)
    });
    setOptions(options_arr)
    setTags(json_data.tags)
  };
  let handleChange = (e) => {
    setFormValues({
        ...formValues,
        [e.target.name]: e.target.value,
    });

  };

  let handleSubmit = (event) => {
    event.preventDefault();
    const postData = async () => {
      // options.forEach(element => {
      //     element.name = element.label,
      //     element.id = element.value
      //     delete element.label
      //     delete element.value
      //   });
      let items = [...selected];
      items.forEach(element => {
          element.name = element.label
          element.id = element.value
          delete element.label
          delete element.value
        });
        formValues.tags = items;
        console.log("product form value")
        console.log(formValues)
        const rawResponse = await fetch("/admin/product", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization":existingTokens
          },
          body: JSON.stringify(formValues),
        });
        const content = await rawResponse.json();
        const formData = new FormData();

        formData.append('file', selectedFile);
        const f = await fetch(
          '/admin/file_upload/' + content.product.id,
          {
            method: 'POST',
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Authorization":existingTokens
            },
            body: formData,

          }
        )
        var element = document.getElementById("success-alert");
        element.classList.remove("hidden");
      };
      postData();

  };
  useEffect(() => {
    fetchData();
    fetchtags();
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
    <strong>Product Created Succesfully</strong> .
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
          onChange={handleChange}
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
          onChange={handleChange}
          required={true}
        />
      </div>
      <div className="form-group">
        <label htmlFor="price" className="form-label mt-4">
          Price
        </label>
        <input
          type="number"
          className="form-control"
          id="price"
          placeholder="price"
          name="price"
          value={formValues.price}
          onChange={handleChange}
        />
      </div>
      <label htmlFor="subcategories" className="form-label mt-4">
        Subcategories
      </label>

      <div className="form-group">
        <label htmlFor="subcategory" className="form-label mt-4">
          subcategory
        </label>
        <select
          className="form-select"
          id="subcategory"
          name="subcategoryID"
          value={formValues.subcategoryID}
          onChange={handleChange}
          required={true}
        >
          <option id="empty" value="" name="subcategoryID"></option>
          {subcategory.map((element, index) => (
            <option value={element.id} name="subcategoryID">{element.Category.name + ":" +element.name}</option>
          ))}
        </select>
      </div>
      <div>
      <label htmlFor="tags" className="form-label mt-4">
          tags
        </label>
      {/* <pre>{JSON.stringify(selected)}</pre> */}
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />
    </div>
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
      {/* <div>
				<button onClick={handleSubmission}>Submit image</button>
			</div> */}
      <button className="button submit btn btn-dark" type="submit">
        Submit
      </button>
    </form>
    </>
  );
};

export default ProductForm;
