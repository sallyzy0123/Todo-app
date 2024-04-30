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

    it('should establish a successful pg db connection', async () => {
    // Create a new connection pool
    const pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASSWORD,
    });

    // console.log('pool', process.env.DB_PORT, process.env.NODE_ENV);
    // Attempt to connect to the database
    const client = await pool.connect();

    // Verify the connection
    expect(client).toBeTruthy();

    // Release the client
    client.release();
  });

  let userId = 0;
  it('should return array of', async () => {
    const users: User[] = await getUser(app);
    userId = users[0].id!;
  });

  const testUser: UserTest = {
    "email": randomstring.generate(7) + '@user.fi',
    "password": 'testpassword'
  }


  it('should create a new user', async () => {
    await postUser(app, testUser);
  })

});