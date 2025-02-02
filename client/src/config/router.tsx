import {lazy} from "react";
import {createBrowserRouter, Navigate} from "react-router-dom";
import {ROUTES} from "@/constants/routes.ts";
import AdminLayout from "@/layouts/admin-layout.tsx";
import SuspenseWrapper from "@/components/internals/suspense-wrapper.tsx";

const AppLanding = lazy(() => import("@/views/landing"));
const AuthenticationLayout = lazy(() => import("@/layouts/authentication-layout.tsx"));
const LoginForm = lazy(() => import("@/views/auth/login.tsx"));
export const AppRouter = createBrowserRouter([
    {
        path: ROUTES.home,
        element: <SuspenseWrapper>
            <AppLanding/>
        </SuspenseWrapper>
    },
    {
        path: `${ROUTES.authentication._base}`,
        element: <SuspenseWrapper>
            <AuthenticationLayout/>
        </SuspenseWrapper>,
        children: [
            {
                path: ROUTES.authentication._base,
                element: <Navigate to={ROUTES.authentication.login} replace/>
            },
            {
                path: ROUTES.authentication.login,
                element: <SuspenseWrapper>
                    <LoginForm/>
                </SuspenseWrapper>
            },
            {
                path: ROUTES.authentication.register,
                element: <>Register</>
            },
            {
                path: `${ROUTES.authentication._base}/*`,
                element: <>404</>
            }
        ]
    },
    {
        path: ROUTES.dashboard._base,
        element: <AdminLayout/>,
        children: [
            {
                path: ROUTES.dashboard._base,
                element: <Navigate to={ROUTES.dashboard.home} replace/>
            },
            {
                path: ROUTES.dashboard.home,
                element: <>DashboardHome</>
            },
            {
                path: ROUTES.dashboard.onboarding,
                element: <>DashboardOnboarding</>
            },
            {
                path: ROUTES.dashboard.timeline,
                element: <>DashboardTimeline</>
            },
            {
                path: ROUTES.dashboard.instructions,
                element: <>DashboardInstructions</>
            },
            {
                path: ROUTES.dashboard.connections,
                element: <>DashboardConnections</>
            }
        ]
    }
]);