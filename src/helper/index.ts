import { IncomingMessage } from "http";

export async function getRequestBody<T>(req: IncomingMessage) {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  return JSON.parse(Buffer.concat(buffers).toString()) as T;
}
