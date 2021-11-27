import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";


const Products = (props) => {

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "name", width: 130 },
    { field: "description", headerName: "description", width: 130 },
    { field: "price", headerName: "price", width: 130 },
    { field: "Subcategory", headerName: "subcategory", width: 200 },
    { field: "tags", headerName: "tags", width: 200 },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            <Link to={"/product/" + params.row.id}>
              <button type="button" className="button btn-sm btn-dark">
                update
              </button>
            </Link>

            <button
              type="button"
              className="button btn-sm btn-dark"
              onClick={() => handleDelete(params.row.id)}
            >
              delete
            </button>
          </div>
        );
      },
    },
  ];
  const navigate = useNavigate();

  const addProduct = (e) => {
    let path = `/productform`;
    navigate(path);
  };
  const [productslist, setProductslist] = useState([]);
  const fetchData = async () => {
    const data = await fetch("/admin/products");
    let json_data = await data.json();
    console.log("products");
    console.log(json_data)
    const date_arr = json_data.products.map((item) => {
      let subcategories_str = "";
      if (item["Subcategory.name"]){
        subcategories_str += "- " + item['Subcategory.name'];
        item.Subcategory = subcategories_str;
      }
      let tag_str = "";
      item.tag.forEach(element => {
        tag_str += "- " + element[0].name;
      });
      item.tags = tag_str;
      
      // const tag_arr = item.tag.map((t) => {
      //   let tag_str = "";
      //   if (t.name){
      //     tag_str += "- " + t.name;
      //     console.log(tag_str)
      //     item.tags = tag_str;
      //   }
        
      // });
    });
    setProductslist(json_data.products);
    console.log(json_data.products);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleDelete = async (id) => {
    const deleteresponse = await fetch("/admin/product/" + id, {
      method: "DELETE",
    });
    const data = await fetchData();
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        disableSelectionOnClick
        rows={productslist}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
      <button type="button" className="button remove btn btn-dark" onClick={addProduct}>
        add product
      </button>
    </div>
  );
};

export default Products;
