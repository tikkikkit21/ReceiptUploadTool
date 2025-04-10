import { Row, Col, Card, Form, Button, DatePicker, InputNumber, Input, Upload } from 'antd';
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
            >
                <DatePicker />
            </Form.Item>

            <Form.Item
                label='Amount'
                name='amount'
            >
                <InputNumber />
            </Form.Item>

            <Form.Item
                label='Description'
                name='description'
            >
                <Input.TextArea rows={4} />
            </Form.Item>

            <Form.Item
                label='Photo'
                name='photo'
            >
                <Upload beforeUpload={() => false}>
                    <Button>
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
