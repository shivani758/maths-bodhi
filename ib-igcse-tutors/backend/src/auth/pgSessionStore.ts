import session from "express-session";
import { query } from "../db/postgres.js";

const DEFAULT_SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 14;

type SessionCallback = (error?: unknown) => void;
type SessionGetCallback = (error: unknown, session?: session.SessionData | null) => void;

function getExpiresAt(sessionData: session.SessionData) {
  const cookie = sessionData.cookie;

  if (cookie?.expires) {
    return new Date(cookie.expires);
  }

  if (typeof cookie?.maxAge === "number" && Number.isFinite(cookie.maxAge)) {
    return new Date(Date.now() + cookie.maxAge);
  }

  return new Date(Date.now() + DEFAULT_SESSION_TTL_MS);
}

export class PgSessionStore extends session.Store {
  get(sid: string, callback: SessionGetCallback) {
    query<{ sess: session.SessionData }>(
      "SELECT sess FROM admin_sessions WHERE sid = $1 AND expires_at > NOW() LIMIT 1",
      [sid],
    )
      .then((result) => {
        callback(null, result.rows[0]?.sess ?? null);
      })
      .catch((error) => {
        callback(error);
      });
  }

  set(sid: string, sessionData: session.SessionData, callback?: SessionCallback) {
    const expiresAt = getExpiresAt(sessionData);

    query(
      `
        INSERT INTO admin_sessions (sid, sess, expires_at)
        VALUES ($1, $2, $3)
        ON CONFLICT (sid)
        DO UPDATE SET
          sess = EXCLUDED.sess,
          expires_at = EXCLUDED.expires_at,
          updated_at = NOW()
      `,
      [sid, sessionData, expiresAt],
    )
      .then(() => callback?.())
      .catch((error) => callback?.(error));
  }

  destroy(sid: string, callback?: SessionCallback) {
    query("DELETE FROM admin_sessions WHERE sid = $1", [sid])
      .then(() => callback?.())
      .catch((error) => callback?.(error));
  }

  touch(sid: string, sessionData: session.SessionData, callback?: SessionCallback) {
    const expiresAt = getExpiresAt(sessionData);

    query("UPDATE admin_sessions SET expires_at = $2, updated_at = NOW() WHERE sid = $1", [
      sid,
      expiresAt,
    ])
      .then(() => callback?.())
      .catch((error) => callback?.(error));
  }
}
