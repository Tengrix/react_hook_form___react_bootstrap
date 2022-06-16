import React, {useState} from 'react';
import {Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardForm from './components/CardForm';


function App() {
    const [focused, setFocused] = useState<boolean>(false)
    return (
        <Container className="d-flex flex-column align-items-center">
            <CardForm focused={focused} setFocused={setFocused}/>
        </Container>
    );
}

export default App;
