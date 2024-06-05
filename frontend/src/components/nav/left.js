import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const LeftMenu = ({ mode }) => {
  return (
    <Menu mode={mode}>
      <Menu.Item key="login">
        <Link to="/login">Login</Link>
      </Menu.Item>
      <Menu.Item key="signup">
        <Link to="/signup">Signup</Link>
      </Menu.Item>
    </Menu>
  );
};

export default LeftMenu;
