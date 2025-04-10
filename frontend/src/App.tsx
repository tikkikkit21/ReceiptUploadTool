import { Row, Col, Card, Form, Button, DatePicker, InputNumber, Input, Upload } from 'antd';
import './App.css';

function App() {
    const receiptForm = (
        <Form>
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
                <Upload>
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
