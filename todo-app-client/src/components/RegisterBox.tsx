import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../hooks/ApiHooks";
import { useState } from "react";

type RegisterBoxProps = {
  showModal: () => void; 
};

function RegisterBox({ showModal }: RegisterBoxProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { postUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const userCredentials = {
        email: email,
        password: password,
    };
    const registerResponse = await postUser(userCredentials);
    if (registerResponse.message === 'User added') {
      console.log("Register successful:", registerResponse);
      showModal();
      setTimeout(() => {
        navigate("/");
      }, 1000)
      return;
    }
    } catch (error) {
    console.error("Register failed:", error);
    }
  };

  return (
    <Form className="text-center" onSubmit={handleSubmit}>
      <h2 className="mb-4">Sign Up</h2>
      <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-4 text-start" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Register
      </Button>
      <Form.Group>
        <Form.Text className="d-inline-flex align-items-center">
          Have the account? &nbsp;
          <Link
            to="/"
            className="text-decoration-none text-purple fw-bold"
          >
            Login
          </Link>{" "}
          &nbsp; here.
        </Form.Text>
      </Form.Group>
    </Form>
  );
}
export default RegisterBox;
