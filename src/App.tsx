import React, {useState} from 'react';
import {Button, Container, Row, Col, Card, Form} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import kaspi from './assets/kaspi.png';
import {useForm, Controller} from 'react-hook-form';
import ReactSelect, {ThemeConfig} from 'react-select';
import {optionsDate} from './utils/utils';
export type DateType = {
    month:string;
    year:string;
}

interface ICardType {
    name: string | null;
    card: number | null;
    date:DateType;
}

function App() {
    const [state, setState] = useState<ICardType>({
        card: null, name: '', date:{month:'', year:''}
    })
    const {
        handleSubmit,
        register,
        reset,
        formState:{errors},
        watch,
        control,
    } = useForm<ICardType>({
        mode:'onChange',
    })
    const onSubmit = (data: ICardType) => {
        console.log(data)
        reset()
    }
    const cardName = watch('name')
    const cardNumber = watch('card')
    const cardYear = watch('date.year')
    const cardMonth = watch('date.month')
    const months = optionsDate('1','12')
    const years = optionsDate('2022','2032')
    const getMonths = (value:string) => {
        return value? months?.find(el=> el.month === value) : ''
    }
    const getYears = (value:string) => {
        return value? years?.find(el=> el.year === value) : ''
    }
    console.log(cardYear, cardMonth)
    return (
        <Container className="d-flex flex-column align-items-center">
            <Card className="m-5 bg-dark text-white border-0">
                <Card.Img src={kaspi} style={{width:350, height:250}} alt="Card image"/>
                <Card.ImgOverlay>
                    <Card.Title className={'text-end mt-1'}>VISA</Card.Title>
                    <Row >
                        <Col className={'mt-5 text-center'}>
                            {!cardNumber? 'XXXX XXXX XXXX XXXX' : cardNumber}
                        </Col>
                    </Row>
                    <Row className={'d-flex flex-row mt-5'}>
                        <Col>
                            <Card.Text className={'text-start'}>
                                Card holder:
                            </Card.Text>
                        </Col>
                        <Col>
                            <Card.Text className={'text-end'}>
                                Expires:
                            </Card.Text>
                        </Col>
                        {/*<Col>*/}
                        {/*    <Card.Text className={'text-end'}>*/}
                        {/*        CVV*/}
                        {/*    </Card.Text>*/}
                        {/*</Col>*/}
                    </Row>
                    <Row className={'d-flex flex-row'}>
                        <Col className={'text-start'}>
                            <Card.Text>
                                {cardName}
                            </Card.Text>
                        </Col>
                        <Col>
                            <Card.Text className={'text-end'}>
                                {cardMonth?cardMonth:'MM'}/{cardYear?cardYear:'YY'}
                            </Card.Text>
                        </Col>
                        {/*<Col>*/}
                        {/*    <Card.Text className={'text-end'}>*/}
                        {/*        {'CVV'}*/}
                        {/*    </Card.Text>*/}
                        {/*</Col>*/}
                    </Row>
                </Card.ImgOverlay>
            </Card>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control {...register('card', {
                        required:true,
                        maxLength:20,
                        minLength:20
                    })} placeholder="Card number"/>
                    <div>
                        {errors?.card&& <span style={{color:'red'}}>Please enter a valid card number</span> }
                    </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Card Name</Form.Label>
                    <Form.Control {...register('name', {
                        required:true
                    })} placeholder="Card name..."/>
                    <div>{ errors?.name && <span style={{color:'red'}}>Please enter a valid name</span>}</div>
                </Form.Group>
                <Row>
                    <Col xl={4} m={4}>
                        <Controller
                            name={'date.month'}
                            control={control}
                            rules={{
                                required:'Month is required'
                            }}
                            render={({field:{onChange, value}})=>(
                                <div>
                                    <ReactSelect
                                        placeholder={'MM'}
                                        options={months}
                                        value={getMonths(value)}
                                        onChange={(newValue)=>onChange((newValue as DateType).month)}
                                    />
                                </div>
                            )}
                        />
                    </Col>
                    <Col l={4} m={4}>
                        <Controller
                            name={'date.year'}
                            control={control}
                            rules={{
                                required:'Year is required'
                            }}
                            render={({field:{value, onChange}})=>(
                                <div>
                                    <ReactSelect
                                        placeholder={'YYYY'}
                                        defaultValue={years[2]}
                                        options={years}
                                        value={getYears(value)}
                                        onChange={(newValue)=>onChange((newValue as DateType).year)}
                                    />
                                </div>
                            )}
                        />
                    </Col>
                    <Col xl={4} m={4}>
                        <Form.Control className={'w-100 mb-2'} placeholder={'cvv'} type="text"/>
                    </Col>
                </Row>
                <Button type={'submit'}>submit</Button>
            </Form>
        </Container>
    );
}

export default App;
