import {QueryResult} from "pg";
import CustomError from "../../classes/CustomError";
import pool from "../../database/db";
import {User} from "../../types/DBTypes";
import {UserResponse} from "../../types/MessageTypes";

const getAllUsers = async (): Promise<User[]> => {
    const result: QueryResult = await pool.query(
        `
        SELECT id, email
        FROM users
        `
    );
    const rows: User[] = result.rows;

    if (rows.length === 0) {
        throw new CustomError('No users found', 404);
    }

    return rows;
};

const getUser = async (id: number): Promise<User> => {
    const result: QueryResult = await pool.query(
        `
        SELECT id, email
        FROM users
        WHERE id = $1
        `, [id]
    );
    const rows: User[] = result.rows;

    if (rows.length === 0) {
        throw new CustomError('No user found', 404);
    }

    return rows[0];
}

const addUser = async (User: Omit<User, 'id'>): Promise<UserResponse> => {
    const result: QueryResult = await pool.query(
        `
        INSERT INTO users (email, password)
        VALUES ($1, $2)
        RETURNING id, email
        `,
        [User.email, User.password]
    );
    const rows: User[] = result.rows;

    if (result.rowCount === 0) {
        throw new CustomError('User not added', 400)
    }
    return {message: 'User added', user: rows[0]}
};

const updateUser = async (
    id: number,
    user: Omit<User, 'id'>
): Promise<UserResponse> => {
    const result: QueryResult = await pool.query(
        `
        UPDATE users
        SET email = $1, password = $2
        WHERE id = $3
        RETURNING id, email
        `,
        [user.email, user.password, id]
    );
    const rows: User[] = result.rows;

    if (result.rowCount === 0) {
        throw new CustomError('User not updated', 400)
    }
    return {message: 'User updated', user: rows[0]}
};

const deleteUser = async (id: number): Promise<UserResponse> => {
    const result: QueryResult = await pool.query(
        `
        DELETE FROM users
        WHERE id = $1
        RETURNING id, email
        `,
        [id]
    );
    const rows: User[] = result.rows;

    if (result.rowCount === 0) {
        throw new CustomError('User not deleted', 400)
    }
    return {message: 'User deleted', user: rows[0]}
};

const getUserLogin = async (email: string): Promise<User> => {
    const result: QueryResult = await pool.query(
        `
      SELECT * FROM users
      WHERE email = $1;
      `,
      [email]
    );
    const rows: User[] = result.rows;
    if (rows.length === 0) {
      throw new CustomError('Invalid username/password', 200);
    }
    return rows[0];
};

export {getAllUsers, getUser, addUser, updateUser, deleteUser, getUserLogin};