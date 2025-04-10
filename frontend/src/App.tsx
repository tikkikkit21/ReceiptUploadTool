import { useState } from 'react';
import { Row, Col, Card, Form, Button, DatePicker, InputNumber, Input, Upload, Modal } from 'antd';
import { UploadOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import './App.css';
import api from './api';
import moment from 'moment';

interface Receipt {
    date: moment.Moment;
    amount: number;
    description: string;
    photo: {
        file: File;
    };
}

function App() {
    const [form] = Form.useForm();
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isFailureModalOpen, setIsFailureModalOpen] = useState(false);

    // sends data to backend
    const handleFormSubmit = async (values: Receipt) => {
        const newReceipt = new FormData();
        newReceipt.append('date', values.date?.format('MM/DD/YYYY'));
        newReceipt.append('amount', values.amount.toString());
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
            setIsFailureModalOpen(true);
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

    // handles clicking 'OK on the failure modal
    const handleFailureModalOk = () => {
        setIsFailureModalOpen(false);
    }

    // pop up when uploading receipt encounters an issue
    const failureModal = (
        <Modal
            open={isFailureModalOpen}
            footer={[
                <Button key='ok' type='primary' onClick={handleFailureModalOk}>
                    OK
                </Button>
            ]}
            title={
                <span>
                    <CloseCircleOutlined style={{ color: 'red', marginRight: 8 }} />
                    Error Encountered
                </span>
            }
        >
            Receipt upload encountered a problem, please try again!
        </Modal>
    );

    // form component for user to input receipt details
    const receiptForm = (
        <Form
            layout='vertical'
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
                initialValue='0.00'
                rules={[
                    {
                        required: true,
                        message: 'Please enter the amount!',
                    },
                    {
                        type: 'number',
                        min: 0.01,
                        message: 'Amount must be a at least $0.01!',
                    },
                ]}
            >
                <InputNumber precision={2} addonBefore='$' />
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
            <Col span={8}>
                <h1>Receipt Upload</h1>
                <Card>{receiptForm}</Card>
                {successModal}
                {failureModal}
            </Col>
        </Row>
    );
}

export default App;
