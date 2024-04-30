import {Application} from "express";
import {User, UserTest} from "../src/types/DBTypes";
import {LoginResponse, MessageResponse} from "../src/types/MessageTypes";
import request from 'supertest';

const getUser = (url: string | Application): Promise<User[]> => {
    return new Promise((resolve, reject) => {
        request(url)
            .get('/api/v1/users')
            .expect(200, (err, response) => {
                if (err) {
                    reject(err);
                } else {
                    const users: User[] = response.body;
                    users.forEach((user) => {
                        expect(user).toHaveProperty('id');
                        expect(user).toHaveProperty('email');
                    })
                    resolve(users);
                }
            })
    })
};

const postUser = (
    url: string | Application,
    user: UserTest,
): Promise<MessageResponse> => {
    return new Promise((resolve, reject) => {
        request(url)
            .post('/api/v1/users')
            .set('Content-Type', 'application/json')
            .send(user)
            // .expect('Content-Type', /json/)
            .expect(200, (err, response) => {
              if (err) {
              reject(err);
            } else {
              const resp: MessageResponse = response.body;
              expect(resp.message).toBe('User added');
              resolve(resp);
            }
      });
    })
}

export {getUser, postUser};