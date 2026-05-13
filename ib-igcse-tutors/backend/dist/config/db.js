import { closePostgresPool, connectPostgres } from "../db/postgres.js";
export async function connectDatabase() {
    await connectPostgres();
}
export async function disconnectDatabase() {
    await closePostgresPool();
}
//# sourceMappingURL=db.js.map