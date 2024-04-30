import axios from 'axios';
import { LoginData, RegisterData } from "../components/LoginBox";
import {TodoData} from "../components/AddNewModal";
import Config from "../utils/config";

const doFetch = axios.create({
  baseURL: Config.API_URL,
});
// const doFetch = axios.create();
// config the token in interceptor
doFetch.interceptors.request.use(
  async (config) => {
    const token = await localStorage.getItem("userToken");
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

const useTodo = () => {
  const getTodosByUser = async () => {
    try {
      const todosResponse = await doFetch<Todo[]>('/todos');
      // console.log("response,", todosResponse);
      return todosResponse.data;
    } catch (error) {
      console.error("getTodos failed", error);
    }
  };

  const addTodo = async (todo: TodoData) => {
    try {
      const TodoResponse = await doFetch.post(
        `/todos`,
        todo,
      );
      // console.log("TodoResponse:", TodoResponse);
      return TodoResponse.data;
    } catch (error) {
      console.error("postTodo: ", error);
    }
  };

  const updateTodo = async (id: number, todo: TodoData) => {
    try {
      const todoResponse = await doFetch.put(
        `/todos/${id}`,
        todo,
      );
      // console.log("todoResponse:", todoResponse);
      return todoResponse.data;
    } catch (error) {
      console.error("updateTodo: ", error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      const todoResponse = await doFetch.delete(
        `/todos/${id}`,
      );
      // console.log("todoResponse:", todoResponse);
      return todoResponse.data;
    } catch (error) {
      console.error("deleteTodo: ", error);
    }
  };

  return { getTodosByUser, addTodo, updateTodo, deleteTodo };
};

const useUser = () => {
  const postUser = async (userCredentials: RegisterData) => {
    try {
      const userResponse = await axios.post(
        `${Config.API_URL}/users`,
        userCredentials,
      );
      // console.log("userResponse:", userResponse);
      
      return userResponse.data;
    } catch (error) {
      console.error("postUser: ", error);
    }
  };

  return { postUser };
};

const useAuthentication = () => {
  const postLogin = async (userCredentials: LoginData) => {
    try {
      const loginResponse = await axios.post(
        `${Config.API_URL}/auth/login`, 
        userCredentials
      );
      // console.log("loginResponse:", );
      return loginResponse.data;
    } catch (error) {
      console.error("postLogin: ", error);
    }
  };

  return { postLogin };
};

export {
  useTodo,
  useUser,
  useAuthentication,
};
