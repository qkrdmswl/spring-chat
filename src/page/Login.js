import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Routes, Route ,Link} from "react-router-dom";

const Login = () => {
  return (
    <div>
    <Form className="LoginForm">
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" placeholder="Enter email" />
      <Form.Text className="text-muted">
        We'll never share your email with anyone else.
      </Form.Text>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" placeholder="Password" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicCheckbox">
      <Form.Check type="checkbox" label="Check me out" />
    </Form.Group>
    <Link to="/Main"><Button variant="primary" type="submit">Submit</Button></Link>
  </Form>
   <Link to="/Register"><Button variant="info">회원가입</Button></Link>
   <Link to="/FindPassword"><Button variant="info">비밀번호 찾기</Button></Link>
   </div>
  )
}

export default Login