import React, {useMemo} from 'react';
import s from './BankCard.module.css';
import kaspi from '../assets/kaspi.png';
import {Card, Col, Row} from 'react-bootstrap';
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

    const cardNumberChangeHandler = useMemo(() =>{
        console.log('aaaa')
        const strLeftPart = defaultNumber.slice(cardNumber?.toString().length)     //
        if(!!cardNumber?.toString().length){
            return cardNumber + strLeftPart
        }else{
            return defaultNumber
        }
    },[cardNumber])

    return (
        <Card className="m-5 bg-dark text-white border-0">
            <div className={s.card}>
                <div className={focused ? [s.content,s.back].join(' ') :s.content}>
                    <div className={s.front}>
                        <Card.Img src={kaspi} alt="Paris" className={s.cardImg}/>
                    </div>
                    <Card.ImgOverlay className={s.cardImg}>
                        <Card.Title className={'text-end mt-1'}>VISA</Card.Title>
                        <Row>
                            <Col className={'mt-5 text-center'}>
                                {cardNumber?.toString().length===19
                                    ?'**** '.repeat(3) + cardNumberChangeHandler.slice(15)
                                    :cardNumberChangeHandler
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
                    <div className={s.back }>
                        <img src={kaspi} alt="Paris" style={{width: 350, height: 250}}/>
                        <Card.ImgOverlay className={'text-start'}>
                            <Row>
                                <Col>CVV {cvv}</Col>
                            </Row>
                        </Card.ImgOverlay>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default BankCard;