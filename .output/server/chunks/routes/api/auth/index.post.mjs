import { c as defineEventHandler, r as readBody, e as setResponseStatus, f as setCookie } from '../../../_/nitro.mjs';
import { p as prisma } from '../../../_/prisma.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:url';
import 'node:path';
import '@prisma/client';

const jwtSecret = process.env.JWT_SECRET || "";
const index_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  if (!body.email || !body.password)
    return setResponseStatus(event, 422, "Missing required fields");
  const user = await prisma.user.findUnique({
    where: { email: body.email }
  });
  if (!user) return setResponseStatus(event, 401, "Invalid email or password");
  const isValidPassword = await bcrypt.compare(body.password, user.password);
  if (!isValidPassword)
    return setResponseStatus(event, 401, "Invalid email or password");
  const userInfo = {
    id: user.id,
    name: user.name,
    email: user.email
  };
  const token = jwt.sign(userInfo, jwtSecret, { expiresIn: "1h" });
  if (!token) return setResponseStatus(event, 401, "Unauthorized");
  setCookie(event, "token", token, {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60
    // 1 hour
  });
  return Response.json({
    user: userInfo
  });
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
