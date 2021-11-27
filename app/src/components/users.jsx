import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import cookie from 'js-cookie'


const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "username", headerName: "Username", width: 130 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "role", headerName: "Role", width: 90 },
  { field: "status", headerName: "Status", width: 90 },

  {
    field: "action",
    headerName: "Action",
    width: 150,
    renderCell: (params) => {
      return (
        <div>
          <Link to={"/user/" + params.row.id}>
            <button type="button" className="button btn btn-dark" >
              Disable User
            </button>
          </Link>
        </div>
      );
    },
  },
];

const Users = (props) => {
  const existingTokens = cookie.get('token');

  const navigate = useNavigate();
  const addAdmin = (e) => {
    let path = `/adminform`;
    navigate(path);
  };
  const [userslist, setUserslist] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/admin/users",{
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Authorization":existingTokens
        }
      });
      let json_data = await data.json();
      console.log(json_data);
      setUserslist(json_data.users);
    };
    fetchData();
  }, []);

  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={userslist}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
      <button type="button" className="button remove btn btn-dark" onClick={addAdmin}>
        add admin
      </button>
    </>
  );
};

export default Users;
