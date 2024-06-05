import React, { useState, useEffect } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { Layout, Button, Drawer } from "antd";
import RightMenu from "./right";
import "./nav.css";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  const showDrawer = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    if (visible) {
      setVisible(false);
    }
  }, [location]);

  return (
    <nav className="navbar">
      <Layout>
        <Layout.Header className="nav-header">
          <div className="logo">
            {/* <h3 className="brand-font">Test Site</h3> */}
          </div>
          <div className="navbar-menu">
            <div className="leftMenu"></div>
            <Button className="menuButton" type="text" onClick={showDrawer}>
              <MenuOutlined />
            </Button>
            <div className="rightMenu">
              <RightMenu mode={"horizontal"} />
            </div>

            <Drawer
              title={"Brand Here"}
              placement="right"
              closable={true}
              onClose={showDrawer}
              visible={visible}
              style={{ zIndex: 99999 }}
            >
              <RightMenu mode={"inline"} />
            </Drawer>
          </div>
        </Layout.Header>
      </Layout>
    </nav>
  );
};

export default Navbar;
