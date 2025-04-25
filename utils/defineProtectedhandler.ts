import { defineEventHandler } from 'h3'
import checkAuth from '~/server/middlewares/auth.global';

export const defineProtectedHandler = (
  handler: Parameters<typeof defineEventHandler>[0]
) =>
  defineEventHandler(async (event) => {
    await checkAuth(event);
    return handler(event);
  });
