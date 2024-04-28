declare type User = {
    id: number;
    email: string;
    password: string;
}

declare type Todo = {
    id: number;
    user_id: number;
    title: string;
    progress: number;
}