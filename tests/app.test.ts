import app from "../src/app";
import request from "supertest";
import { Pool } from 'pg';
import {LoginResponse, UserResponse} from "../src/types/MessageTypes";
import {User, UserTest} from "../src/types/DBTypes";
import randomstring from "randomstring";
import {getUser, postUser} from "./userFunction";

describe("Testing RESTful API", () => {
  it('responds with API message', async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(JSON.parse(response.text)).toEqual({
        message: 'API location: api/v1',
      });
  });

  it('should return the auth, users, todos route', async () => {
    const response = await request(app).get("/api/v1");
    expect(response.status).toBe(200);
    expect(JSON.parse(response.text)).toEqual({
        message: 'routes: auth, users, todos',
      });
  });

});