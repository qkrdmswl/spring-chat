import React from 'react'
import Figure from 'react-bootstrap/Figure';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const PostCard = () => {
  return (
    <div>
      <Container>
        <Row>
          <Col>(이모티콘) 제목</Col>
        </Row>
        <Row>
          <Col>상세내용</Col>
        </Row>
        <Row>
          <Col>작성날짜</Col>
        </Row>
        <Figure>
        <Figure.Image
          width={171}
          height={180}
          alt="171x180"
          src="holder.js/171x180"
        />
        </Figure>

        <br/><br/><br/>

        </Container>
    
    </div>
  )
}

export default PostCard