import React, {useEffect, useState} from 'react';
import s from '../card.module.css';
import kaspi from '../assets/kaspi.png';
import {Col, Row, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface ICardType{
    focused:boolean;
    cardNumber:string|null;
    cardName:string|null;
    cardMonth:string;
    cardYear:string;
    cvv:string;
}
const defaultNumber = 'XXXX XXXX XXXX XXXX'
const BankCard = ({focused,cardNumber,cardName,cardYear,cardMonth,cvv}:ICardType) => {


    const cardNumberChangeHandler = () =>{
        const strLeftPart = defaultNumber.slice(cardNumber?.length)     //
        if(!!cardNumber?.length){
            return cardNumber + strLeftPart
        }else{
            return defaultNumber
        }
    }


    useEffect(()=>{
        cardNumberChangeHandler()
    },[cardNumber])
    return (
        <Card className="m-5 bg-dark text-white border-0">
            <div className={s.flipBox}>
                <div className={s.flipBoxInner}>
                    <div className={s.flipBoxFront}>
                        <Card.Img src={kaspi} alt="Paris" style={{width: 350, height: 250}}/>
                    </div>
                    <Card.ImgOverlay style={{width: 350, height: 250}}>
                        <Card.Title className={'text-end mt-1'}>VISA</Card.Title>
                        <Row>
                            <Col className={'mt-5 text-center'}>
                                {cardNumber?.length===19
                                    ?'**** '.repeat(3) + cardNumberChangeHandler().slice(15)
                                    :cardNumberChangeHandler()
                                }
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
                        </Row>
                        <Row className={'d-flex flex-row'}>
                            <Col className={'text-start'}>
                                <Card.Text>
                                    {cardName}
                                </Card.Text>
                            </Col>
                            <Col>
                                <Card.Text className={'text-end'}>
                                    {cardMonth ? cardMonth : 'MM'}/{cardYear ? cardYear : 'YY'}
                                </Card.Text>
                            </Col>
                        </Row>
                    </Card.ImgOverlay>
                    <div className={s.flipBoxBack }>
                        <img src={kaspi} alt="Paris" style={{width: 350, height: 250}}/>
                        <Card.ImgOverlay className={'text-start'}>
                            <Row>
                                <Col style={{marginTop:100}}>CVV</Col>
                            </Row>
                            <Row>
                                <Col>{cvv}</Col>
                            </Row>
                        </Card.ImgOverlay>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default BankCard;