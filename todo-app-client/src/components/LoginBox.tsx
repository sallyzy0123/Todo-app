import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { useAuthentication } from "../hooks/ApiHooks";
import { MainContext } from "../context/MainContext";

export type LoginResponse ={
  token: string;
  user: User;
}

export type LoginData = {
  username: string;
  password: string;
}

export type RegisterData = {
  email: string;
  password: string;
}

type LoginBoxProps = {
  showModal: () => void; 
};

function LoginBox({ showModal }: LoginBoxProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { postLogin } = useAuthentication();
  const navigate = useNavigate();
  const { setIsLoggedIn, setUser } = useContext(MainContext);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      const userCredentials: LoginData = {
        username: email,
        password: password,
      };

      const loginResponse = await postLogin(userCredentials);
      const loginToken = loginResponse.token;

      // save the token to local storage
      await localStorage.setItem("userToken", loginToken);

      // set the user and login status
      setUser(loginResponse.user);
      setIsLoggedIn(true);

      // show the modal to indicate successful login
      showModal();

      // navigate to the home page
      setTimeout(() => {
        navigate("/home");
      }, 1000);

      console.log("Login successful:", loginResponse);
      return;
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Form className="text-center" onSubmit={handleSubmit}>
      <h2 className="mb-4">Login</h2>
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
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
      <Form.Group>
        <Form.Text className="d-inline-flex align-items-center">
          No account yet? &nbsp;
          <Link
            to="/register"
            className="text-decoration-none text-purple fw-bold"
          >
            Register
          </Link>
          &nbsp; here.
        </Form.Text>
      </Form.Group>
    </Form>
  );
}
export default LoginBox;
