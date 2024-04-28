import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import LoginBox from "../components/LoginBox";
import MyModal from "../components/MyModal";
import { useState } from "react";
import "../css/Login.css";

function Login() {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleShowModal = () => {
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 1000); // 1 seconds
  };

  return (
    <Container
      fluid
      className="login-page d-flex flex-row justify-content-around align-items-center fw-bold"
    >
      <Col md={5} lg={5} className="text-black p-5 border rounded-5">
        <LoginBox showModal={handleShowModal}/>
      </Col>
      {showModal && <MyModal text="Login successfully!" />}
    </Container>
  );
}

export default Login;
