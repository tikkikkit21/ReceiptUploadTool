import { useState } from 'react';
import { Row, Col, Card, Form, Button, DatePicker, InputNumber, Input, Upload, Modal } from 'antd';
import { UploadOutlined, CheckCircleOutlined } from '@ant-design/icons';
import './App.css';
import api from './api';

function App() {
    const [form] = Form.useForm();
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    // sends data to backend
    const handleFormSubmit = async (values) => {
        const newReceipt = new FormData();
        newReceipt.append('date', values.date?.format('MM/DD/YYYY'));
        newReceipt.append('amount', values.amount);
        newReceipt.append('description', values.description);
        newReceipt.append('photo', values.photo.file);

        try {
            await api.post('/receipts', newReceipt, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setIsSuccessModalOpen(true);
        }
        catch (e) {
            console.error(e);
        }
    }

    // handles clicking 'OK' on the success modal
    const handleSuccessModalOk = () => {
        setIsSuccessModalOpen(false);
        form.resetFields();
    }

    // pop up when receipt is uploaded succesfully
    const successModal = (
        <Modal
            open={isSuccessModalOpen}
            footer={[
                <Button key='ok' type='primary' onClick={handleSuccessModalOk}>
                    OK
                </Button>
            ]}
            title={
                <span>
                    <CheckCircleOutlined style={{ color: 'green', marginRight: 8 }} />
                    Success
                </span>
            }
        >
            Receipt successfully uploaded!
        </Modal>
    );

    // form component for user to input receipt details
    const receiptForm = (
        <Form
            onFinish={handleFormSubmit}
            form={form}
        >
            <Form.Item
                label='Date'
                name='date'
                rules={[
                    {
                        required: true,
                        message: 'Please select a date!',
                    },
                ]}
            >
                <DatePicker />
            </Form.Item>

            <Form.Item
                label='Amount'
                name='amount'
                rules={[
                    {
                        required: true,
                        message: 'Please enter the amount!',
                    },
                    {
                        type: 'number',
                        min: 0,
                        message: 'Amount must be a positive number!',
                    },
                ]}
            >
                <InputNumber addonBefore='$' />
            </Form.Item>

            <Form.Item
                label='Description'
                name='description'
                rules={[
                    {
                        required: true,
                        message: 'Please enter a description!',
                    }
                ]}
            >
                <Input.TextArea
                    rows={4}
                    allowClear
                />
            </Form.Item>

            <Form.Item
                label='Photo'
                name='photo'
                rules={[
                    {
                        required: true,
                        message: 'Please upload a photo!',
                    }
                ]}
            >
                <Upload
                    beforeUpload={() => false}
                    accept="image/*"
                >
                    <Button icon={<UploadOutlined />}>
                        Upload
                    </Button>
                </Upload>
            </Form.Item>

            <Form.Item>
                <Button
                    type='primary'
                    htmlType='submit'
                >
                    Submit Receipt
                </Button>
            </Form.Item>
        </Form>
    );

    return (
        <Row justify='center'>
            <h1>Receipt Upload</h1>
            <Col span={12}>
                <Card>{receiptForm}</Card>
                {successModal}
            </Col>
        </Row>
    );
}

export default App;
