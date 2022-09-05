import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form} from "react-bootstrap";
import axios from "axios";
import {Link} from "react-router-dom";

function SignUp(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token) window.location.replace("/");
    }, [])

    const registerUser = async () => {
        await axios.post('http://localhost:8080/signup', {
            username: username,
            password: password
        });
        window.location.replace("/login");
    };

    return (
        <Container>
            <Col md={{span: 4, offset: 4}}>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                            type="text"
                            placeholder="Enter user name"
                            value={username}
                            onChange={event => setUsername(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            onChange={event => setPassword(event.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="button" onClick={() => registerUser()}>
                        Submit
                    </Button>
                    <Link to="/login">
                        <Button variant="link">Do you have account ?</Button>
                    </Link>
                </Form>
            </Col>
        </Container>
    );
}

export default SignUp;