import React from "react";
import {Error} from "@mui/icons-material";
import "./NotFound.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="PageNotFound">
      <Error />

      <Typography>Page Not Found </Typography>
      <Link to="/">Home</Link>
    </div>
  );
};

export default NotFound;
