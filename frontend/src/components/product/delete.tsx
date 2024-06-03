import React, { useState, useEffect } from "react";
import { Layout, Typography, Card, Row, Col, Pagination, Modal, Button } from "antd";
import { DeleteOutlined } from '@ant-design/icons';
import './product.css'; 

const { Content } = Layout;
const { Title, Paragraph } = Typography;

function DeleteProducts() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(2);
    const [totalProducts, setTotalProducts] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, [currentPage]);

    const fetchProducts = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/products?page=${currentPage}`);
            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }
            const data = await response.json();
            setProducts(data.products);
            setTotalPages(data.total_pages);
            setTotalProducts(data.total_products);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleDelete = async (productId) => {
        try {

            const response = await fetch(`http://localhost:8000/api/delete-product/${productId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error("Failed to delete product");
            }
            // Refresh the product list after deletion
            fetchProducts();
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const showModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };



    return (
        <Layout>
            <Content className="home-content">
                <div className="home-container">
                  
  
                    <Title level={2} className="home-title">Delete Products</Title>
                    <Row gutter={[48,64]} justify="center">
                        {products.map(product => (
                            <Col key={product.id} span={6}>
                                <Card
                                    hoverable
                                    className="product-card"
                                    cover={<img alt={product.name} src={product.image_url} className="product-image" />}
                                    actions={[
                                        <Button type="link" onClick={() => showModal(product)}>View Details</Button>,
                                        <DeleteOutlined key="delete" onClick={() => handleDelete(product.id)} />
                                    ]}
                                >
                                    <Title level={4} className="product-name">{product.name}</Title>
                                    <Paragraph className="product-highlights">{product.highlights}</Paragraph>
                                    <h2 className="product-price">Rs. {product.price}</h2>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <Pagination
                        current={currentPage}
                        onChange={handlePageChange}
                        total={totalProducts}
                        pageSize={15}
                        className="pagination"
                    />
                    </div>
                    <Modal
                    title={selectedProduct ? selectedProduct.name : "Product Details"}
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    {selectedProduct && (
                        <>
                            <img alt={selectedProduct.name} src={selectedProduct.image_url} className="product-image" />
                            <Title level={4} className="product-name">{selectedProduct.name}</Title>
                            <Paragraph className="product-highlights">{selectedProduct.highlights}</Paragraph>
                            <h2 className="product-price">Rs. {selectedProduct.price}</h2>
                        </>
                    )}
                </Modal>
            </Content>
        </Layout>
    );
}

export default DeleteProducts;
