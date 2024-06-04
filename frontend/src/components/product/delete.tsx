import React, { useState, useEffect } from "react";
import {
  Layout,
  Typography,
  Card,
  Row,
  Col,
  Pagination,
  Modal,
  Button,
  Form,
  Input,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import "./product.css";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

function DeleteProducts() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [productHighlights, setProductHighlights] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/products?page=${currentPage}`
      );
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
      const response = await fetch(
        `http://localhost:8000/api/delete-product/${productId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
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
    setProductName(product.name);
    setProductPrice(product.price);
    setImageUrl(product.image_url);
    setProductHighlights(product.highlights);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    const values = {
      search_name: selectedProduct.name,
      update_name: productName,
      update_price: productPrice,
      update_image_url: imageUrl,
      update_highlights: productHighlights,
    };

    try {
      const response = await fetch("http://localhost:8000/api/update/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        console.log("Product updated successfully!");
        // Refresh the product list after update
        fetchProducts();
        setIsModalOpen(false);
      } else {
        console.error("Failed to update product:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <Layout>
      <Content className="home-content">
        <div className="home-container">
          <Title level={2} className="home-title">
            Edit Products
          </Title>
          <Row gutter={[48, 64]} justify="center">
            {products.map((product) => (
              <Col key={product.id} span={6}>
                <Card
                  hoverable
                  className="product-card"
                  cover={
                    <img
                      alt={product.name}
                      src={product.image_url}
                      className="product-image"
                    />
                  }
                  actions={[
                    <Button type="link" onClick={() => showModal(product)}>
                      View Details
                    </Button>,
                    <DeleteOutlined
                      key="delete"
                      onClick={() => handleDelete(product.id)}
                    />,
                  ]}
                >
                  <Title level={4} className="product-name">
                    {product.name}
                  </Title>
                  <Paragraph className="product-highlights">
                    {product.highlights}
                  </Paragraph>
                  <h2 className="product-price">Rs. {product.price}</h2>
                </Card>
              </Col>
            ))}
          </Row>
          <Pagination
            current={currentPage}
            onChange={handlePageChange}
            total={totalProducts}
            pageSize={8}
            className="pagination"
          />
        </div>
        <Modal
          title={selectedProduct ? selectedProduct.name : "Product Details"}
          visible={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {selectedProduct && (
            <>
              <img
                alt={selectedProduct.name}
                src={selectedProduct.image_url}
                className="product-image"
              />
              <Title level={4} className="product-name">
                {selectedProduct.name}
              </Title>
              <Paragraph className="product-highlights">
                {selectedProduct.highlights}
              </Paragraph>
              <h2 className="product-price">Rs. {selectedProduct.price}</h2>

              <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 14 }}
                onFinish={handleSubmit}
              >
                <Form.Item
                  label="Product Name"
                  name="update_name"
                  rules={[
                    {
                      required: true,
                      message: "Please input product name!",
                    },
                  ]}
                >
                  <Input
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  label="Product Price"
                  name="update_price"
                  rules={[
                    {
                      required: true,
                      message: "Please input product price!",
                    },
                  ]}
                >
                  <Input
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  label="Image Url"
                  name="update_image_url"
                  rules={[
                    { required: true, message: "Please input image URL!" },
                  ]}
                >
                  <Input
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  label="Product Highlights"
                  name="update_highlights"
                  rules={[
                    {
                      required: true,
                      message: "Please input product highlights!",
                    },
                  ]}
                >
                  <Input.TextArea
                    value={productHighlights}
                    onChange={(e) => setProductHighlights(e.target.value)}
                  />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
                  <Button type="primary" htmlType="submit">
                    Update Product
                  </Button>
                </Form.Item>
              </Form>
            </>
          )}
        </Modal>
      </Content>
    </Layout>
  );
}

export default DeleteProducts;
