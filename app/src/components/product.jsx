import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";
import cookie from 'js-cookie'

const Product = ()=> {
    const existingTokens = cookie.get('token');

    const params = useParams();
    const [tags, setTags] = useState([]);
    const [options, setOptions] = useState([]);
  
  
    const [selected, setSelected] = useState([]);
  
    const [formValues, setFormValues] = useState({});
    const [subcategory, setSubcategory] = useState([]);


    const fetchData = async ()=>{
        const data = await fetch("/admin/product/" + params.productId,{
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Authorization":existingTokens
            }
        });
        let json_data = await data.json(); 
        console.log('llllllllll') 
        console.log(json_data.product[0])
        setFormValues(json_data.product[0])
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
        console.log(json_data);
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
      const fetchCategory = async () => {
        const data = await fetch("/admin/subcategories/",{
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Authorization":existingTokens
            }
        });
        let json_data = await data.json();    
        setSubcategory(...subcategory, json_data.subcategories);
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
          
            formValues.tags = options;
            const rawResponse = await fetch("/admin/product/" + params.productId, {
              method: "PUT",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization":existingTokens
              },
              body: JSON.stringify(formValues),
            });
            var element = document.getElementById("success-alert");
            element.classList.remove("hidden");
          };
          postData();
    
      };
    const hidealert = ()=>{
        var element = document.getElementById("success-alert");
        element.classList.add("hidden");
      }
      useEffect(() => {
        fetchCategory();
        fetchtags();
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
    <strong>Product Updated Succesfully</strong> .
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
        >
          <option id="empty" value="" name="subcategoryID"></option>
          {subcategory.map((element, index) => (
            <option value={element.id} name="subcategoryID">{element.Category.name + ":" +element.name}</option>
          ))}
        </select>
      </div>
      {/* <div>
      <label htmlFor="tags" className="form-label mt-4">
          tags
        </label>
      <MultiSelect
        options={options}
        value={selected}
        onChange={setSelected}
        labelledBy="Select"
      />
    </div> */}
   
      <button className="button submit btn btn-dark" type="submit">
        Submit
      </button>
    </form>
    </>
    )
}

export default Product
