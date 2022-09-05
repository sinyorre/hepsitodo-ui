import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import './TodoList.css';

function TodoList(props) {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [addTodoVisibleStatus, setAddTodoVisibleStatus] = useState(false);

    useEffect(() => {
        console.log(localStorage.getItem("token"));
        let token = localStorage.getItem("token");
        if (!token) window.location.replace("/login");
    }, [])

    useEffect(() => {
        fetchData()
            .catch(console.error);
    }, [])

    const fetchData = async () => {
        const res = await axios.get('http://localhost:8080/todos', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        });
        setTodos(res.data);
    }

    const changeDoneStatus = async (taskId) => {
        await axios.put(`http://localhost:8080/todos/${taskId}`, {}, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        });
        fetchData();
    }

    const deleteTodo = async (taskId) => {
        await axios.delete(`http://localhost:8080/todos/${taskId}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        });
        fetchData();
    }

    const addTodo = async () => {
        await axios.post(`http://localhost:8080/todos`, {"title": title, "description": description}, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        });
        setAddTodoVisibleStatus(!addTodoVisibleStatus);
        fetchData();
    }

    return (
        <Container>
            <Col md={{span: 4, offset: 4}}>
                {
                    addTodoVisibleStatus ? (
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control
                                    type="text"
                                    placeholder="Buy a milk..."
                                    value={title}
                                    onChange={(event) => setTitle(event.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                    placeholder="From our special market..."
                                />
                            </Form.Group>
                            <Button variant="success" type="button" onClick={() => addTodo()}>
                                Add
                            </Button>
                            <Button variant="danger" type="button"
                                    onClick={() => setAddTodoVisibleStatus(!addTodoVisibleStatus)}
                                    style={{marginLeft: 10}}
                            >
                                Close
                            </Button>
                        </Form>
                    ) : (
                        <div style={{textAlign: 'center', marginTop: 20}}>
                            <Button variant="primary" onClick={() => setAddTodoVisibleStatus(!addTodoVisibleStatus)}>
                                New Todo
                            </Button>
                            <Button
                                variant="danger"
                                style={{marginLeft: 10}}
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    window.location.replace("/login");
                                }}>
                                Sign Out
                            </Button>
                        </div>
                    )
                }
            </Col>

            <Col md={{span: 4, offset: 4}}>
                <hr/>
            </Col>
            {
                todos && todos.map(todo => (
                    <Row>
                        <Col md={{span: 4, offset: 4}}>
                            <div className={`todo-card ${todo.done && "completed"}`}
                                 onClick={() => changeDoneStatus(todo.id)}>
                                <div>
                                    <h5>{todo.title}</h5>
                                </div>
                                <div>
                                    <p>{todo.description}</p>
                                </div>
                                {todo.done && (
                                    <div>
                                        <Button
                                            variant="danger"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                deleteTodo(todo.id)
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </Col>
                    </Row>
                ))
            }
        </Container>
    );
}

export default TodoList;