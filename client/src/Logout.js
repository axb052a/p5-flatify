import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function Logout({ setUser }) {
  const navigate = useNavigate();

  function handleLogOut() {
    fetch("http://localhost:5555/logout", {
      method: "DELETE",
      credentials: 'include',  // Include credentials in the request
    }).then((r) => {
      if (r.ok) {
        setUser(null);
        // Redirect to the home page
        navigate.push("/");
      }
    });
  }

  return <Button variant="contained" color="secondary" onClick={handleLogOut}>Logout</Button>;
}
