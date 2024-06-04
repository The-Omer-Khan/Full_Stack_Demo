import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const LeftMenu = ({ mode }) => {
  return (
    <Menu mode={mode}>
      <Menu.Item key="explore">
        <Link to="/explore">Explore</Link>
      </Menu.Item>
      <Menu.Item key="features">
        <Link to="/features">Features</Link>
      </Menu.Item>
      <Menu.Item key="about">
        <Link to="/about">About Us</Link>
      </Menu.Item>
      <Menu.Item key="contact">
        <Link to="/contact">Contact Us</Link>
      </Menu.Item>
    </Menu>
  );
};

export default LeftMenu;
