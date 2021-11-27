import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";




const Category = (props) => {
  const params = useParams();

  const [category, setCategory] = useState({});
  const [subcategory, setsubcategory] = useState([]);
  const [deletedsubcategory, setdeletedsubcategory] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);


  const fetchData = async () => {
    const data = await fetch("/admin/category/" + params.categoryId);
    let json_data = await data.json();
    if (json_data.category[0] != undefined){
      setsubcategory(...subcategory, json_data.category[0].Subcategories);
    }
    console.log("subcaategory");
    var cat_arr = json_data.category;
    if (cat_arr[0] != undefined){
      let category = {
        name: cat_arr[0].name,
        description: cat_arr[0].description,
      };
      setCategory(category);
    }

  };
  const onInputchange = (event) => {
    setCategory({
      ...category,
      [event.target.name]: event.target.value,
    });
  };
  // let addFormFields = () => {
  //   setsubcategory([...subcategory, { name: "", description: "" }]);
  // };
  let deleteFormFields = (e) => {
    let index = e.target.id;
    let items = [...subcategory];
    let item = { ...items[index] };
    setdeletedsubcategory([...deletedsubcategory, item]);
    items.splice(index, 1);
    setsubcategory(items);
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
      new_subcategories: [],
      deleted_subcategory: [],
    };
    json_obj.name = category.name;
    json_obj.description = category.description;
    json_obj.new_subcategories = subcategories;
    json_obj.deleted_subcategory = deletedsubcategory;
    const postData = async () => {
      const rawResponse = await fetch("/admin/category/" + params.categoryId, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(json_obj),
      });
      const content = await rawResponse.json();
      var element = document.getElementById("success-alert");
      element.classList.remove("hidden");
    };
    postData();
  };
  const fetchSubcategory = async () => {
    const data = await fetch("/admin/subcategories/");
    let json_data = await data.json();
    // console.log(json_data);
    var options_arr = []
    json_data.subcategories.forEach(element => {
      let obj={
        label:"",
        value:""
      }
      obj.label =element.Category.name +" :"+ element.name
      obj.value = element.id
      options_arr.push(obj)
    });
    setOptions(options_arr)
    setSubcategories(json_data.subcategories)
  };

  const updatearrayItem = (event) => {
    let index = event.target.id;
    // 1. Make a shallow copy of the items
    let items = [...subcategory];
    // 2. Make a shallow copy of the item you want to mutate
    let item = { ...items[index] };
    // 3. Replace the property you're intested in
    item[event.target.name] = event.target.value;
    // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
    items[index] = item;
    // 5. Set the state to our new copy
    setsubcategory(items);
  };
  useEffect(() => {
    fetchData();
    fetchSubcategory();
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
        <strong>Category Updated Succesfully</strong> .
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="Name" className="form-label mt-4">
            Category Name
          </label>
          <input
            type="text"
            className="form-control"
            id="Name"
            name="name"
            placeholder={category.name}
            value={category.name}
            onChange={onInputchange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Description" className="form-label mt-4">
            Category Description
          </label>
          <input
            type="text"
            className="form-control"
            id="Description"
            name="description"
            defaultValue={category.description}
            value={category.description}
            onChange={onInputchange}
          />
        </div>
        <div>
      <label htmlFor="tags" className="form-label mt-4">
          Subcategories
        </label>
      {/* <pre>{JSON.stringify(selected)}</pre> */}
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />
    </div>

        {subcategory.map((element, index) => (
          <ul>
            <li key={element.name}>
            <div className="form-group">
              <label htmlFor="subname" className="form-label mt-4">
                SubCategory Name
              </label>
              <input
                type="text"
                className="form-control"
                id={index}
                name="name"
                value={element.name}
                disabled="true"
                onChange={updatearrayItem}
              />
            </div>
            <div className="form-group">
              <label htmlFor="subdescription" className="form-label mt-4">
                SubCategory Description
              </label>
              <input
                type="text"
                className="form-control"
                id={index}
                name="description"
                disabled="true"
                value={element.description}
                onChange={updatearrayItem}
              />
            </div>
            <button
              className="btn btn-dark"
              type="button"
              id={index}
              onClick={deleteFormFields}
            >
              delete
            </button>
            </li>
          </ul>
        ))}
        <div className="button-section">
          {/* <button
            className="btn btn-dark"
            type="button"
            onClick={() => addFormFields()}
          >
            Add
          </button> */}
          <button type="submit" className="btn btn-dark">
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default Category;
