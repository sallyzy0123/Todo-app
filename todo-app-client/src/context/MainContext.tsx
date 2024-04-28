import React, {useState, useEffect} from "react";
import {useTodo} from "../hooks/ApiHooks";

type MainContextType = {
    isLoggedIn: boolean;
    user: User | null;
    setUser: (user: User | null) => void;
    setIsLoggedIn: (value: boolean) => void;
    todoArray: Todo[];
    setTodoArray: (todoArray: Todo[]) => void;
    fetchTodos: () => void;
};

const defaultContext: MainContextType = {
    isLoggedIn: false,
    user: null,
    setUser: () => {},
    setIsLoggedIn: () => {},
    todoArray: [],
    setTodoArray: () => {},
    fetchTodos: () => {},
};

const MainContext = React.createContext(defaultContext);

const MainProvider = (props: React.PropsWithChildren) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [todoArray, setTodoArray] = useState<Todo[]>([]);
    const { getTodosByUser } = useTodo(); 

    const fetchTodos = async () => {
        try {
          const todos = await getTodosByUser();
          if (!todos) {
            return;
          }
          setTodoArray(todos);
        } catch (error) {
          console.error("fetchTodos failed:", error);
        }
      };
    
      useEffect(() => {
        if (isLoggedIn) {
          fetchTodos();
        }
      }, [isLoggedIn])

    const value: MainContextType = {
        isLoggedIn,
        user,
        setUser,
        setIsLoggedIn,
        todoArray,
        setTodoArray,
        fetchTodos,
    };
    
    return (
        <MainContext.Provider value={value}>{props.children}</MainContext.Provider>
    );
};

export { MainContext, MainProvider };
