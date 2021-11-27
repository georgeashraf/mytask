import React, { useState, useEffect } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0)
  const checkout = () => {
    localStorage.removeItem("cart")
    var element = document.getElementById("success-alert");
    element.classList.remove("hidden");
  };
  const fetchData = async () => {
    var cart = JSON.parse(localStorage.getItem("cart"))
    setCartItems( cart|| []);
    var total = 0
    if (cart){
      cart.forEach(element => {
        let t = element.price * element.quantity
        total += t
      });
      setTotal(total)
    }
  

  };
  const hidealert = ()=>{
    var element = document.getElementById("success-alert");
    element.classList.add("hidden");
  }
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
    <strong>Your Order is Created Succesfully</strong> .
  </div>
      <div className="product">
        {cartItems.map((element, index) => (
          <div class="card mb-3" className="product-card">
            <h3 class="card-header">{element.name}</h3>
            <div class="card-body">
              <h5 class="card-title">{element.description}</h5>
              <h6 class="card-subtitle text-muted">Price: {element.price}</h6>
            </div>
            <img src={element.img_url} alt="" height="50%" width="100%" />
            <div class="card-body">
              <p class="card-text">
                {/* {element.Subcategory} */}
                quantity : {element.quantity}
              </p>
            </div>
          </div>
        ))}
      </div>
    
        <div>Total: {total}</div>
       
      <button className="btn btn-dark checkout" type="submit" onClick={() => checkout()}>
        checkout
      </button>
    </>
  );
};

export default Cart;
