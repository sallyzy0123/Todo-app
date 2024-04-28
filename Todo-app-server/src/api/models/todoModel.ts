import {QueryResult} from "pg";
import CustomError from "../../classes/CustomError";
import pool from "../../database/db";
import {Todo} from "../../types/DBTypes";
import {TodoResponse} from "../../types/MessageTypes";

const getAllTodosByUser = async (userId: number): Promise<Todo[]> => {
    const result: QueryResult = await pool.query(
        `
        SELECT * FROM todos WHERE user_id = $1
        `,
        [userId]
    );
    const rows: Todo[] = result.rows;

    if (rows.length === 0) {
        throw new CustomError('No todos found', 404);
    }

    return rows;
};

const getTodoById = async (id: number): Promise<Todo> => {
    const result: QueryResult = await pool.query(
        `
        SELECT * FROM todos
        WHERE id = $1
        `, [id]
    );
    const rows: Todo[] = result.rows;

    if (rows.length === 0) {
        throw new CustomError('No todo found', 404);
    }

    return rows[0];
};

const addTodo = async (todo: Omit<Todo, 'id'>): Promise<TodoResponse> => {
    const result: QueryResult = await pool.query(
        `
        INSERT INTO todos (user_id, title, progress)
        VALUES ($1, $2, $3)
        RETURNING *
        `, [todo.user_id, todo.title, todo.progress]
    );
    const rows: Todo[] = result.rows;

    if (result.rowCount === 0) {
        throw new CustomError('Todo not added', 400)
    }
    return {message: 'Todo added', todo: rows[0]}
}

const updateTodo = async (
    id: number,
    userId: number,
    todo: Pick<Todo, 'title' | 'progress'>
): Promise<TodoResponse> => {
    const result: QueryResult = await pool.query(
        `
        UPDATE todos
        SET title = $1, progress = $2
        WHERE id = $3 AND user_id = $4
        RETURNING *
        `, [todo.title, todo.progress, id, userId]
    );
    // console.log('result:', result);
    const rows: Todo[] = result.rows;

    if (result.rowCount === 0) {
        throw new CustomError('Todo not updated', 400)
    }
    return {message: 'Todo updated', todo: rows[0]}
};

const deleteTodo = async (id: number, userId: number): Promise<TodoResponse> => {
    const result: QueryResult = await pool.query(
        `
        DELETE FROM todos
        WHERE id = $1 AND user_id = $2
        RETURNING *
        `, [id, userId]
    );
    const rows: Todo[] = result.rows;

    if (result.rowCount === 0) {
        throw new CustomError('Todo not deleted', 400)
    }
    return {message: 'Todo deleted', todo: rows[0]}
};

export {getAllTodosByUser, getTodoById, addTodo, updateTodo, deleteTodo};