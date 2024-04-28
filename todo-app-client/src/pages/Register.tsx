import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import RegisterBox from "../components/RegisterBox";
import { useState } from "react";
import MyModal from "../components/MyModal";

function Register() {
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
        <RegisterBox showModal={handleShowModal} />
      </Col>
      {showModal && <MyModal text="Register successfully!" />}
    </Container>
  );
}

export default Register;
