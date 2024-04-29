type User = {
    id: number;
    email: string;
    password: string;
};

type Todo = {
    id: number;
    user_id: number;
    title: string;
    progress: number;
};


export { User };

export { Todo };