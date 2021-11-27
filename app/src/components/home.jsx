import React, {useState,useEffect} from "react";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { useNavigate } from "react-router-dom";


const Home = () => {
    const slideImages = [
        {
          url: 'jumia1.jpg',
          caption: 'Slide 1'
        },
        {
          url: 'jumia2.jpg',
          caption: 'Slide 2'
        },
        {
          url: 'jumia3.jpg',
          caption: 'Slide 3'
        },
      ];
      const [categorieslist, setCategorieslist] = useState([]);

      const navigate = useNavigate();

      const addCategory = (cat) => {
        console.log(cat)
        let path = `/productslist?category=${cat}`;
        navigate(path);
      };
      const fetchData = async () => {
        const data = await fetch("/admin/categories");
        let json_data = await data.json();
        const date_arr = json_data.categories.map((item) => {
          let subcategories_str = "";
          item.Subcategories.forEach((element) => {
            subcategories_str += "- " + element.name;
          });
          item.Subcategories = subcategories_str;
          return item;
        });
        setCategorieslist(date_arr);
      };
      useEffect(() => {
        fetchData();
      }, []);

  return (
    <div>

         <div className="slide-container">
        <Slide >
         {slideImages.map((slideImage, index)=> (
            <div className="each-slide" key={index}>
              <div style={{'backgroundImage': `url(${slideImage.url})`}} className="img-container" >
              </div>
            </div>
          ))} 
        </Slide>
      </div>
      <div className="card-container">
      <div className="product">
      {categorieslist.map((element, index) => (
        
          

                          <div
                          className="card text-white bg-primary mb-3 product-card"
                          style={{ "maxWidth": "50rem" }}
                        >
                          <div className="card-header">{element.name}</div>
                          <div className="card-body">
                            <h4 className="card-title">{element.description}</h4>
                            <img src={`./files/category-${element.id}.jpeg`} alt="" height="100%" width="100%" />
                          </div>
                          <button className="button submit btn-md btn-dark" type="submit" onClick={()=>addCategory(element.id)}>
          show more products
        </button>
                        </div>
                       
                        ))}  
                         </div>
        </div>
    
    </div>
  );
};

export default Home;
