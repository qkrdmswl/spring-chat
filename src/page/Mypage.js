import React, { useState } from 'react'
import getStorageItem from '../utils/useLocalStorage'
import Navigation from '../component/Navigation'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {notification} from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import Axios from "axios";
import jwt_decode from "jwt-decode";
import InputGroup from 'react-bootstrap/InputGroup';
import { Link,useNavigate} from "react-router-dom";

const Mypage = (isAuthenticated) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const token = getStorageItem('jwtToken','')[0]
  const {user_id}= jwt_decode(token);

  const deleteAccount =async(event)=>{
    event.preventDefault();
    try{
    const response = await Axios.delete(`${process.env.REACT_APP_LOCAL_DJ_IP}user/delete/${user_id.payload}/`)
    window.localStorage.clear();
    handleClose();
    notification.open({
      message: "계정삭제 성공",
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
      placement : 'topRight'
    });
    navigate('/')
    }catch(e){
      notification.open({
        message: "계정삭제 실패, 다시 시도해 주세요.",
        icon: <FrownOutlined style={{ color: "#108ee9" }} />,
        placement : 'topRight'
      });

    }
  }
  return (
    <div>

      
      <br />
      <form action='' method='post'>
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            Name
          </InputGroup.Text>
          <Form.Control
            aria-label="Default"
            aria-describedby="inputGroup-sizing-small"

            value = {"찬희"}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            Email
          </InputGroup.Text>
          <Form.Control
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            value={"chanhee1158@gmail.com"}
            readOnly
          />
        </InputGroup>
        <Button type='submit'>Change Name</Button>
        &nbsp;
        <Button variant="danger" onClick={handleShow}>
          Delete Account
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Alert</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure to delete account?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={deleteAccount}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
      <br />


   


     

    </div>
  )
}

export default Mypage