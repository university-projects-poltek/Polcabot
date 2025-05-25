import React from "react";
import { Link } from "react-router";

export const Home = () => {
  return (
    <div>
      <Link to="/login">Login</Link>
      Welcome home
    </div>
  );
};
