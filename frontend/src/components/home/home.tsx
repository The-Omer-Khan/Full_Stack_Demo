import React from "react";
import { Layout, Menu, Typography, Card, Row, Col } from "antd";
import { Link } from "react-router-dom";

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

const products = [
	{
		id: 1,
		name: "Product 1",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis fermentum augue.",
	},
	{
		id: 2,
		name: "Product 2",
		description:
			"Nam condimentum efficitur risus, nec iaculis tortor tincidunt sed. Ut in eros at nunc tristique sodales.",
	},
	{
		id: 3,
		name: "Product 3",
		description:
			"Sed id enim vestibulum, bibendum ipsum vel, bibendum lorem. Integer suscipit sapien vitae odio lobortis.",
	},
];

function HomePage() {
	return (
		<Layout>
			<Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
				<div
					className="logo"
					style={{
						width: 120,
						height: 31,
						background: "rgba(255, 255, 255, 0.2)",
						margin: "16px 24px 16px 0",
						float: "left",
					}}
				/>
				<Menu
					theme="dark"
					mode="horizontal"
					defaultSelectedKeys={["1"]}
					style={{ lineHeight: "64px" }}>
					<Menu.Item key="1">
						<Link to="/login">Login</Link>
					</Menu.Item>
					<Menu.Item key="2">
						<Link to="/signup">Sign Up</Link>
					</Menu.Item>
				</Menu>
			</Header>
			<Content style={{ padding: "0 50px", marginTop: 64 }}>
				<div style={{ background: "#fff", padding: 24, minHeight: 380 }}>
					<Title level={2}>Welcome to Our Product Page</Title>
					<Row gutter={[16, 16]}>
						{products.map(product => (
							<Col key={product.id} span={8}>
								<Card>
									<Title level={3}>{product.name}</Title>
									<Paragraph>{product.description}</Paragraph>
									<Link to={`/product/${product.id}`}>View Details</Link>
								</Card>
							</Col>
						))}
					</Row>
				</div>
			</Content>
		</Layout>
	);
}

export default HomePage;
