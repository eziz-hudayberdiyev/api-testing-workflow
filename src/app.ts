import { createServer, IncomingMessage, ServerResponse } from "http";
import { getRequestBody } from "./helper";
import { ITodo } from "./interface";

const todos: ITodo[] = [];

async function requestListener(
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) {
  res.setHeader("Content-Type", "application/json");

  if (req.url === "/todos") {
    switch (req.method) {
      case "GET":
        res.writeHead(200);
        res.end(JSON.stringify(todos));
        break;
      case "POST":
        const body = await getRequestBody<ITodo>(req);

        todos.push(body);

        res.writeHead(201);
        res.end(JSON.stringify(body));
        break;
    }
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: "not-found" }));
  }
}

export function bindServer() {
  const server = createServer(requestListener);

  return server;
}
