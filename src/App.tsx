import React, {useState} from 'react';
import {Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardForm from './components/CardForm';
import s from './App.module.css'

function App() {
    const [focused, setFocused] = useState<boolean>(false)
    return (
        <div className={s.main}>
            <Container className="d-flex flex-column align-items-center">
                <CardForm focused={focused} setFocused={setFocused}/>
            </Container>
        </div>
    );
}

export default App;
