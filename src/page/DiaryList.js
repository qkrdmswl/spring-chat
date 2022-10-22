import React from 'react'
import Button from 'react-bootstrap/Button';
import Navigation from '../component/Navigation'
import { Routes, Route ,Link} from "react-router-dom";
import SplitButton from 'react-bootstrap/SplitButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Pagination from 'react-bootstrap/Pagination';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import PostCard from '../component/PostCard';

const DiaryList = ({setNavVisible}) => {
  return (
    <div>
        <br/><br/><br/>
        <Container>
        <Row >
          <Col ><h5>n개의 글</h5></Col>
          <Col xs={6}></Col>
          <Col>
          <SplitButton
          key='Info'
          id={`dropdown-split-variants-'Info'`}
          variant={'Info'.toLowerCase()}
          title={'정렬조건'}
        >
          <Dropdown.Item eventKey="1">최신순</Dropdown.Item>
          <Dropdown.Item eventKey="2">오래된순</Dropdown.Item>
        </SplitButton></Col>
        </Row>
        </Container><br/>

        
        <PostCard/>
        <PostCard/>
        <PostCard/>

        <div class = 'pagination'>
          <Pagination>
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Item>{1}</Pagination.Item>
          <Pagination.Ellipsis />
          <Pagination.Item>{10}</Pagination.Item>
          <Pagination.Item>{11}</Pagination.Item>
          <Pagination.Item active>{12}</Pagination.Item>
          <Pagination.Item>{13}</Pagination.Item>
          <Pagination.Item disabled>{14}</Pagination.Item>
          <Pagination.Ellipsis />
          <Pagination.Item>{20}</Pagination.Item>
          <Pagination.Next />
          <Pagination.Last /> 
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/diary-create"><Button variant="info">일기 쓰기</Button></Link>
          </Pagination>
      </div>
    </div>

    
  )
}

export default DiaryList