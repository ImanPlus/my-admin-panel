"use client";

/**
 * run all the promises through this method for later handling of errors
 * @param promise - is any kind of promise which might throw an error
 * @throws Error - is the message of the promise
 */
export async function promisePipe<T>(promise: Promise<T>): Promise<T | string> {
  try {
    const result = await promise;
    return result;
  } catch (error: unknown) {
    const message = String(error);
    throw new Error(message);
  }
}
