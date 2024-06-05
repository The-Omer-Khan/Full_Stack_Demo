import React from "react";
import { Menu, Avatar } from "antd";
import { UserOutlined, CodeOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const RightMenu = ({ mode }) => {
  return (
    <Menu mode={mode}>
      <Menu.SubMenu
        title={
          <>
            <Avatar icon={<UserOutlined />} />
            <span className="username">John Doe</span>
          </>
        }
      >
        <Menu.Item key="project">
          <Link to="/login">
            <CodeOutlined /> Login
          </Link>
        </Menu.Item>

        <Menu.Item key="logout">
          <Link to="/logout">
            <LogoutOutlined /> Logout
          </Link>
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

export default RightMenu;
