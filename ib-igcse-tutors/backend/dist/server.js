import { createApp } from "./app.js";
import { connectDatabase } from "./config/db.js";
import { env } from "./config/env.js";
function getErrorMessage(error) {
    return error instanceof Error ? error.message : "Unknown startup error.";
}
async function start() {
    await connectDatabase();
    const app = createApp();
    app.listen(env.PORT, env.HOST, () => {
        console.log(`Maths Bodhi backend running on ${env.HOST}:${env.PORT}`);
    });
}
start().catch((error) => {
    console.error("Failed to start Maths Bodhi backend.", getErrorMessage(error));
    process.exit(1);
});
//# sourceMappingURL=server.js.map