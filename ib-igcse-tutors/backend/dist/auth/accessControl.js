import { getUserSessionById } from "../services/authService.js";
import { getPortalSessionById } from "../services/portalAuthService.js";
import { ApiError } from "../utils/ApiError.js";
async function validateAdminSession(req) {
    if (!req.session.user) {
        return null;
    }
    if (req.authUser?.id === req.session.user.id) {
        return req.authUser;
    }
    const user = await getUserSessionById(req.session.user.id);
    if (!user) {
        req.session.user = undefined;
        return null;
    }
    req.session.user = user;
    req.authUser = user;
    return user;
}
async function validatePortalSession(req) {
    if (!req.session.portalUser) {
        return null;
    }
    if (req.portalAuthUser?.id === req.session.portalUser.id) {
        return req.portalAuthUser;
    }
    const user = await getPortalSessionById(req.session.portalUser.id);
    if (!user) {
        req.session.portalUser = undefined;
        return null;
    }
    const sessionUser = {
        id: user.id,
        role: user.role,
    };
    req.session.portalUser = sessionUser;
    req.portalAuthUser = sessionUser;
    return sessionUser;
}
export function requireAuth(req, _res, next) {
    void validateAdminSession(req)
        .then((user) => {
        if (!user) {
            return next(new ApiError(401, "Authentication required.", { code: "AUTH_REQUIRED" }));
        }
        return next();
    })
        .catch(next);
}
export function requireRole(roles) {
    return (req, _res, next) => {
        void validateAdminSession(req)
            .then((user) => {
            if (!user) {
                return next(new ApiError(401, "Authentication required.", { code: "AUTH_REQUIRED" }));
            }
            if (!roles.includes(user.role)) {
                return next(new ApiError(403, "You do not have permission to access this resource.", { code: "FORBIDDEN" }));
            }
            return next();
        })
            .catch(next);
    };
}
export function requirePortalAuth(req, _res, next) {
    void validatePortalSession(req)
        .then((user) => {
        if (!user) {
            return next(new ApiError(401, "Authentication required.", { code: "AUTH_REQUIRED" }));
        }
        return next();
    })
        .catch(next);
}
export function requirePortalRole(roles) {
    return (req, _res, next) => {
        void validatePortalSession(req)
            .then((user) => {
            if (!user) {
                return next(new ApiError(401, "Authentication required.", { code: "AUTH_REQUIRED" }));
            }
            if (!roles.includes(user.role)) {
                return next(new ApiError(403, "You do not have permission to access this resource.", { code: "FORBIDDEN" }));
            }
            return next();
        })
            .catch(next);
    };
}
//# sourceMappingURL=accessControl.js.map