import React, { useState, useEffect, useContext } from "react";

import { useNavigate, Link } from "react-router-dom";


import { DataGrid } from "@mui/x-data-grid";

const Categories = (props) => {

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "name", width: 130 },
    { field: "description", headerName: "description", width: 130 },
    { field: "Subcategories", headerName: "Subcategories", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <div>
            <Link to={"/category/" + params.row.id}>
              <button type="button" className="button btn btn-dark btn-sm">
                update
              </button>
            </Link>

            <button
              type="button"
              className="button btn btn-dark btn-sm"
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

  const addCategory = (e) => {
    let path = `/categoryform`;
    navigate(path);
  };
  const [categorieslist, setCategorieslist] = useState([]);
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
  const handleDelete = async (id) => {
    const deleteresponse = await fetch("/admin/category/" + id, {
      method: "DELETE",
    });
    const data = await fetchData();
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        disableSelectionOnClick
        rows={categorieslist}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
      <button type="button" className="button remove btn btn-dark" onClick={addCategory}>
        add category
      </button>
    </div>
  );
};

export default Categories;
