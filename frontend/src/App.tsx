import { Row, Col, Card, Form, Button, DatePicker, InputNumber, Input, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './App.css';
import api from './api';

function App() {
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
        }
        catch (e) {
            console.error(e);
        }
    }

    const receiptForm = (
        <Form onFinish={handleFormSubmit}>
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
            </Col>
        </Row>
    );
}

export default App;
