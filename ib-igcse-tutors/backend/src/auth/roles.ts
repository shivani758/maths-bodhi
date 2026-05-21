import type { AdminUserRole } from "../types/auth.js";

export const ADMIN_PANEL_ROLES = ["super_admin", "admin", "editor"] as const satisfies readonly AdminUserRole[];
export const ADMIN_DELETE_ROLES = ["super_admin", "admin"] as const satisfies readonly AdminUserRole[];
