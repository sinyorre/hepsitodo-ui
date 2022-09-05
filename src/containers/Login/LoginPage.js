import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form} from "react-bootstrap";
import axios from "axios";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";

function LoginPage(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token) window.location.replace("/");
    }, [])

    const login = async () => {
        try {
            const res = await axios.post('http://localhost:8080/login', {
                username: username,
                password: password
            });
            localStorage.setItem("token", res.data);
            window.location.replace("/");
        } catch (e) {
            toast.error('Sorry ! Unexpected error occurred', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
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
                    <Button variant="primary" type="button" onClick={() => login()}>
                        Login
                    </Button>
                    <Link to="/signup">
                        <Button variant="link">Sign up</Button>
                    </Link>
                </Form>
            </Col>
        </Container>
    );
}

export default LoginPage;