import { json } from "@remix-run/node";

/**
 * A helper function that helps in returning the accurate HTTP status,
 * 400 Bad Request, to the client.
 */
export const badRequest400 = <T>(data: T) => json<T>(data, { status: 400 });
