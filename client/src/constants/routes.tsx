const dash_base = "/dashboard";
export const ROUTES = {
    home: "/",
    authentication: {
        login: "/login",
        register: "/register",
    },
    dashboard: {
        _base: dash_base,
        home: `${dash_base}/dashboard`,
        onboarding: `${dash_base}/onboarding`,
        timeline: `${dash_base}/timeline`,
        instructions: `${dash_base}/instructions`,
        connections: `${dash_base}/connections`,
    }
}