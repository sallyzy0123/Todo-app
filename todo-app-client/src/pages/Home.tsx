import ListHeader from "../components/ListHeader";
import ListGroup from 'react-bootstrap/ListGroup';
import {useContext} from "react";
import ListItem from "../components/ListItem";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import '../css/Home.css';
import {MainContext} from "../context/MainContext";

function Home() {
  const { todoArray } = useContext(MainContext);

  return (
    <Container
      fluid
      className="home-page d-flex flex-column justify-content-center align-items-center"
    >
      <Col md={8} lg={8} className="p-3 border rounded-5">
        <ListHeader />
        <ListGroup>
          {todoArray.map(todo => (
            <ListItem key={todo.id} todo={todo}/>
          ))}
        </ListGroup>
      </Col>
    </Container>
  );
}

export default Home;