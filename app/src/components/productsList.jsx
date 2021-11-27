import React, { useState, useEffect } from "react";
import {useLocation} from "react-router-dom";
import cookie from 'js-cookie'

const ProductsList = () => {
  const existingTokens = cookie.get('token');
  const existingRole = cookie.get('role');
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([])
  const search = useLocation().search;
  const cat = new URLSearchParams(search).get('category');
  const subcat = new URLSearchParams(search).get('subcategory');
  console.log(cat)
  const addtoCart = (product)=>{
    let localCart = JSON.parse(localStorage.getItem("cart"))
    let cartCopy=[]
    if (localCart != null){
       cartCopy = [...localCart];
    }
    else{
       cartCopy = [...cart];
    }
    
    let id = product.id
    let existingItem = cartCopy.find(cartItem => cartItem.id == id);
    if (existingItem) {
      existingItem.quantity += 1 //update item
  } else { //if item doesn't exist, simply add it
    product.img_url = `./files/products-${product.id}.jpeg`
    product.quantity = 1
    cartCopy.push(product)
    
  }
  //update app state
  setCart(cartCopy)
  let stringCart = JSON.stringify(cartCopy);
  if (existingTokens){
    var element = document.getElementById("success-alert");
    element.classList.remove("hidden");
    element.innerHTML = "A new Item is added to the cart"
    localStorage.setItem("cart", stringCart)

  }else{
    var element = document.getElementById("success-alert");
    element.classList.remove("hidden");
  }
  
  

  }
  const fetchData = async () => {
    let data = null
    if(cat){
       data = await fetch(`/admin/productsfiltered?category=${cat}`);

    }else if(subcat){
       data = await fetch(`/admin/productsfiltered?subcategory=${subcat}`);

    }
    let json_data = await data.json();
    console.log(json_data.products)
    setProducts(json_data.products);
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
      data-bs-dismiss="alert"
    ></button>
    <strong>Please login to add item to cart</strong> .
  </div>
    <div className="product">
      
      {products.map((element, index) => (
                             <div class="card mb-3" className="product-card">
                             <h3 class="card-header">{element.name}</h3>
                             <div class="card-body">
                               <h5 class="card-title">{element.description}</h5>
                               <h6 class="card-subtitle text-muted">Price: {element.price}</h6>
                             </div>
                             <img src={`./files/products-${element.id}.jpeg`} alt="" height="50%" width="100%" />
                             <div class="card-body">
                               <p class="card-text">
                                 {/* {element.Subcategory} */}
                               </p>
                               <button className="btn btn-dark" type="submit" onClick={()=>addtoCart(element)}>
                                  add to cart
                                </button>
                             </div>
                           </div>
                        ))}

    </div>
    </>

  );
};

export default ProductsList;
