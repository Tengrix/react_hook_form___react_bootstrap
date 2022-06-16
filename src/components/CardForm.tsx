import React from 'react';
import {Button, Col, Form, Row} from 'react-bootstrap';
import {Controller, useForm} from 'react-hook-form';
import ReactSelect from 'react-select';
import {DateType, ICardType} from '../types/Types';
import {getMonths, getYears, months, years} from '../utils/utils';
import BankCard from './BankCard';
import s from './CardForm.module.css'

interface ICardFormType {
    setFocused: (value: boolean) => void;
    focused: boolean;
}

const CardForm = ({setFocused, focused}: ICardFormType) => {
    const {handleSubmit, register, reset, formState: {errors}, watch, control,} = useForm<ICardType>({
        mode: 'onChange',
    })
    const onSubmit = (data: ICardType) => {
        console.log('your data: ', data)
        reset()
    }
    const onFocus = () => setFocused(true)
    const onBlur = () => setFocused(false)
    const cardName = watch('name')
    const cardNumber = watch('card')?.toString().replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim()
    const cardYear = watch('date.year.label')
    const cardMonth = watch('date.month.label')
    const cvv = watch('cvv')
    return (
        <Form className={s.formMainWrapper} onSubmit={handleSubmit(onSubmit)}>
            <div className={s.formBankCardWrapper}>
                <BankCard
                    focused={focused}
                    cardNumber={cardNumber as string}
                    cardName={cardName}
                    cardMonth={cardMonth}
                    cardYear={cardYear}
                    cvv={cvv}/>
            </div>
            <div className={s.formWrapper}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control maxLength={19} type="number" {...register('card', {
                        required: true,
                        maxLength: 19
                    })} placeholder="Card number"/>
                    <div>
                        {errors?.card && <span style={{color: 'red'}}>Please enter a valid card number</span>}
                    </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Card Name</Form.Label>
                    <Form.Control {...register('name', {
                        required: true
                    })} placeholder="Card name..."/>
                    <div>{errors?.name && <span style={{color: 'red'}}>Please enter a valid name</span>}</div>
                </Form.Group>
                <Row>
                    <Col xl={4} m={4}>
                        <Controller
                            name={'date.month.label'}
                            control={control}
                            rules={{
                                required: 'Month is required'
                            }}
                            render={({field: {onChange, value}}) => (
                                <div>
                                    <ReactSelect
                                        menuPlacement={'top'}
                                        placeholder={'MM'}
                                        options={months}
                                        value={getMonths(value)}
                                        onChange={(newValue) => onChange((newValue as DateType).label)}
                                    />
                                </div>
                            )}
                        />
                    </Col>
                    <Col l={4} m={4}>
                        <Controller
                            name={'date.year.label'}
                            control={control}
                            rules={{
                                required: 'Year is required'
                            }}
                            render={({field: {value, onChange}}) => (
                                <div>
                                    <ReactSelect
                                        menuPlacement={'top'}
                                        placeholder={'YYYY'}
                                        defaultValue={years[2]}
                                        options={years}
                                        value={getYears(value)}
                                        onChange={(newValue) => onChange((newValue as DateType).label)}
                                    />
                                </div>
                            )}
                        />
                    </Col>
                    <Col xl={4} m={4}>
                        <Form.Control
                            {...register('cvv')}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            placeholder={'cvv'}
                            type="number"
                            maxLength={4}
                        />
                    </Col>
                </Row>
                <div className={s.btnWrapper}>
                    <Button className={s.sbmBtn} type={'submit'}>submit</Button>
                </div>
            </div>
        </Form>
    );
};

export default CardForm;