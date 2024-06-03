import React, { useState } from "react";
import { Layout, Form, Input, Button, Typography } from "antd";
const {Title}= Typography;
const { Content } = Layout;

function AddProductPage() {
    
    return (
        <Layout>
            <Title></Title>
            <h1>Add Products</h1>
            <Content style={{ padding: '50px' }}>
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                >
                    <Form.Item
                        label="Product Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input product name!' }]}
                    >
                        <Input value="something" />
                    </Form.Item>

                    <Form.Item
                        label="Product Price"
                        name="price"
                        rules={[{ required: true, message: 'Please input product name!' }]}
                    >
                        <Input value="something" />
                    </Form.Item>

                    <Form.Item
                        label="Image Url"
                        name="image_url"
                        rules={[{ required: true, message: 'Please input product name!' }]}
                    >
                        <Input value="something" />
                    </Form.Item>

                    <Form.Item
                        label="Product Highlights"
                        name="highlights"
                        rules={[{ required: true, message: 'Please input product highlights!' }]}
                    >
                        <Input.TextArea value={""} />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
                        <Button type="primary">
                            Add Product
                        </Button>
                    </Form.Item>
                </Form>
            </Content>
        </Layout>
    );
}

export default AddProductPage;
