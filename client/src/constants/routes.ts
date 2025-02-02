const dash_base = "/dashboard";
const auth_base = "/auth";
export const ROUTES = {
    home: "/",
    authentication: {
        _base: auth_base,
        login: `${auth_base}/login`,
        register: `${auth_base}/register`,
    },
    dashboard: {
        _base: dash_base,
        home: `${dash_base}/home`,
        onboarding: `${dash_base}/onboarding`,
        timeline: `${dash_base}/timeline`,
        instructions: `${dash_base}/instructions`,
        connections: `${dash_base}/connections`,
    }
}