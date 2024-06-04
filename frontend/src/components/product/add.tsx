import React, { useState } from "react";
import { Layout, Form, Input, Button, Typography } from "antd";
const { Title } = Typography;
const { Content } = Layout;

function AddProductPage() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [productHighlights, setProductHighlights] = useState("");

  const handleSubmit = async () => {
    const values = {
      name: productName,
      price: productPrice,
      image_url: imageUrl,
      highlights: productHighlights,
    };

    try {
      const response = await fetch("http://localhost:8000/api/add-product/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        console.log("Product added successfully!");
        // Redirect to home page
        window.location.href = "/"; // You can change the path if needed
      } else {
        console.error("Failed to add product:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <Layout>
      <Content className="home-content">
        <section
          style={{
            alignItems: "center",
            backgroundColor: "#f0f2f5",
            display: "flex",
            height: "100vh",
            padding: "64px 0px",
          }}
        >
          <div
            style={{
              margin: "0 auto",
              padding: "5px",
              width: "900px",
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div style={{ marginBottom: "24px" }}>
              <div className="home-container">
                <Title level={2} className="home-title">
                  Add Product
                </Title>
                <Content style={{ padding: "50px" }}>
                  <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    onFinish={handleSubmit}
                  >
                    <Form.Item
                      label="Product Name"
                      name="name"
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
                      name="price"
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
                      name="image_url"
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
                      name="highlights"
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
                        Add Product
                      </Button>
                    </Form.Item>
                  </Form>
                </Content>
              </div>
            </div>
          </div>
        </section>
      </Content>
    </Layout>
  );
}

export default AddProductPage;
