import { connectDatabase, disconnectDatabase } from "../config/db.js";
import { env } from "../config/env.js";
import { applyPostgresSchema } from "../db/migrate.js";
import { ensureSeedAdmin } from "../services/authService.js";
import { importFrontendSeeds } from "./importFrontendSeeds.js";
import { loadFrontendStaticSeedStore } from "./frontendStaticSeeds.js";
function getErrorMessage(error) {
    return error instanceof Error ? error.message : "Unknown seed error.";
}
async function runSeed() {
    await connectDatabase();
    await applyPostgresSchema();
    const seedStore = await loadFrontendStaticSeedStore();
    await ensureSeedAdmin({
        name: env.ADMIN_SEED_NAME,
        email: env.ADMIN_SEED_EMAIL,
        password: env.ADMIN_SEED_PASSWORD,
        role: "super_admin",
    });
    const importSummary = await importFrontendSeeds(seedStore);
    console.log("Maths Bodhi seed completed successfully.");
    console.log(JSON.stringify({
        tutors: importSummary.tutors,
        blogs: importSummary.blogs,
        reviews: importSummary.reviews,
        results: importSummary.results,
        pages: importSummary.pages,
        adminUserEnsured: true,
    }, null, 2));
}
runSeed()
    .catch((error) => {
    console.error("Failed to seed Maths Bodhi backend.", getErrorMessage(error));
    process.exitCode = 1;
})
    .finally(async () => {
    await disconnectDatabase();
});
//# sourceMappingURL=runSeed.js.map