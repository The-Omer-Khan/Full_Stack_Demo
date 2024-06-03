import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import Login from '../login/Login.tsx';
import Signup from '../signup/signup.tsx';

const { Header, Content } = Layout;

function HomePage() {
  return (
    <Router>
      <Layout>
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1"><Link to="/login">Login</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/signup">Sign Up</Link></Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <div className="site-layout-content">
            {/* Your content goes here */}
            <h1>Welcome to My Website</h1>
            <p>This is the homepage content.</p>
          </div>
        </Content>
      </Layout>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default HomePage;
