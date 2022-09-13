import { request } from "undici";
import { bindServer } from "../src/app";
import { ITodo } from "../src/interface";

beforeAll(async () => {
  console.log("Connection startup");
  await bindServer().listen(4000, "localhost");
});

describe("api-test", () => {
  test("#1 -> Create todo", async () => {
    const response = await request("http://localhost:4000/todos", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        id: 1,
        description: "Drink a mocha",
        status: "pending",
        deadline: "12-09-2022",
      }),
    });

    // should return 201
    expect(response.statusCode).toBe(201);

    // response should consist requested body fields
    const responseBody = await response.body.json();

    // generics can be passed as its useful in typescript
    expect(responseBody).toEqual<ITodo>({
      id: expect.any(Number), // expect.any check if value instance of given Class type
      description: expect.any(String),
      status: expect.any(String),
      deadline: expect.any(String),
    });
  });

  test("#2 -> Get todos", async () => {
    const response = await request("http://localhost:4000/todos", {
      method: "GET",
    });

    // should return 200
    expect(response.statusCode).toBe(200);

    // response should consist requested body fields
    const responseBody = await response.body.json();

    // generics can be passed as its useful in typescript
    // toContainEqual is testing from array
    expect(responseBody).toContainEqual<ITodo>({
      id: expect.any(Number), // expect.any check if value instance of given Class type
      description: expect.any(String),
      status: expect.any(String),
      deadline: expect.any(String),
    });
  });
});
