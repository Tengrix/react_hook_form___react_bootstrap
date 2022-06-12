import React, {useState} from 'react';
import {Button, Container, Row, Col, Card, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import kaspi from './assets/kaspi.png'
import {useForm} from 'react-hook-form';

interface ICardType {
    name: string | null;
    card: number | null
}

function App() {
    const [state, setState] = useState<ICardType>({card: null, name: ''})
    const {handleSubmit, register,} = useForm<ICardType>()
    const onSubmit = (data: ICardType) => {
        setState(data)
    }
    console.log(state.card)
    return (
        <Container className="d-flex flex-column align-items-center">
            <Card className="m-5 bg-dark text-white w-25">
                <Card.Img src={kaspi} alt="Card image"/>
                <Card.ImgOverlay>
                    <Card.Title className={'text-end'}>VISA</Card.Title>
                    <Row className={'d-flex flex-row-reverse'}>
                        <Col>
                            <Card.Text className={' text-end mt-5'}>
                                Expires
                            </Card.Text>
                        </Col>
                        <Col>
                            <Card.Text className={'mt-5'}>
                                Card holder
                            </Card.Text>
                        </Col>
                    </Row>
                    <Row className={'d-flex flex-row-reverse'}>
                        <Col>
                            <Card.Text className={'text-end'}>
                                MM/YY
                            </Card.Text>
                        </Col>
                        <Col>
                            <Card.Text>
                                {state.name}
                            </Card.Text>
                        </Col>
                    </Row>
                </Card.ImgOverlay>
            </Card>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control {...register('card')} placeholder="Card number"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Card Name</Form.Label>
                    <Form.Control {...register('name')} placeholder="Card name..."/>
                </Form.Group>
                <Button type={'submit'}>submit</Button>
            </Form>
        </Container>
    );
}

export default App;
