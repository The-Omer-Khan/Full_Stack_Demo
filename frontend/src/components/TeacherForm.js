import React, { useState } from 'react';
import axios from 'axios';
import { Input, Button, Upload, message } from 'antd'; // Import Ant Design components
import { UploadOutlined } from '@ant-design/icons'; // Import Ant Design icons

const TeacherForm = () => {
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [file, setFile] = useState(null);
    const [errors, setErrors] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('subject', subject);
        formData.append('file', file);

        try {
            await axios.post('/your-django-view-url/', formData);
            // Handle success (e.g., show success message, redirect)
            message.success('Form submitted successfully');
        } catch (error) {
            setErrors(error.response.data.errors);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
            <Upload
                beforeUpload={() => false}
                onChange={(info) => {
                    if (info.file.status !== 'uploading') {
                        setFile(info.file);
                    }
                }}
                showUploadList={false}
            >
                <Button icon={<UploadOutlined />}>Upload File</Button>
            </Upload>
            {errors && <div>{Object.values(errors).flat().join(', ')}</div>}
            <Button type="primary" htmlType="submit">Submit</Button>
        </form>
    );
};

export default TeacherForm;
