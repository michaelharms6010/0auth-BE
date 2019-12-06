const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");
const Users = require("../users/users-model");

describe("auth router", () => {

  describe("Registration", () => {

    //clear the test db before every test
    beforeEach(async () => {
        await db("users").truncate();
    });

    const userData = { username: "user", password: "pass" };

    it("should return a status code 201", () => {
        let response
        return request(server).post('/api/auth/register').send(userData).then(res => {
            response = res
            expect(response.status).toBe(201)
        })
    });

    it('should return a welcome message', () => {
        const message = "new user created: user"
        let response
        return request(server).post('/api/auth/register').send(userData).then(res => {
            response = res
            expect(response.body.message).toEqual(message)
        })
    })
  });

  describe('Login', () => {
    const userData = { username: "user", password: "pass" };   

    it('should return 200', () => {
        let response
        return request(server).post('/api/auth/login').send(userData).then(res => {
            response = res
            expect(response.status).toBe(200)
        })
    })

    it('should return a welcome message', () => {
        let message = 'Welcome user'
        let response
        return request(server).post('/api/auth/login').send(userData).then(res => {
            response = res
            expect(response.body.message).toEqual(message)
        })
    })
  })
});
