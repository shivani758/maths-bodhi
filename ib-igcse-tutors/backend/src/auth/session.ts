import session from "express-session";
import { env } from "../config/env.js";
import { PgSessionStore } from "./pgSessionStore.js";

export function createSessionMiddleware() {
  return session({
    name: env.SESSION_COOKIE_NAME,
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: false,
    store: new PgSessionStore(),
    cookie: {
      httpOnly: true,
      sameSite: env.SESSION_COOKIE_SAME_SITE,
      secure: env.SESSION_COOKIE_SECURE,
      domain: env.SESSION_COOKIE_DOMAIN,
      maxAge: undefined,
    },
  });
}
