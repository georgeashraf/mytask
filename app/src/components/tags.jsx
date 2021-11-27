import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import cookie from 'js-cookie'


const Tags = (props) => {
  const navigate = useNavigate();
  const existingTokens = cookie.get('token');

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "name", width: 130 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            <Link to={"/tag/" + params.row.id}>
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
  const [tagslist, setTagslist] = useState([]);
  const fetchData = async () => {
    const data = await fetch("/admin/tags",{
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization":existingTokens
    }
  });
    let json_data = await data.json();
    setTagslist(json_data.tags);
  };
  const handleDelete = async (id) => {
    const deleteresponse = await fetch("/admin/tag/" + id, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization":existingTokens
      },
    });
    const data = await fetchData();
  };  
  const addTag = (e) => {
    let path = `/tagform`;
    navigate(path);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          disableSelectionOnClick
          rows={tagslist}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
        <button type="button" className="button remove btn btn-dark" onClick={addTag}>
          add tag
        </button>
      </div>
    </div>
  );
};

export default Tags;
