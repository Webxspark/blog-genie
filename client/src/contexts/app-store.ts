import {create} from "zustand/react";
import {APP_CONFIG} from "@/constants/app.config.ts";

export interface User {
    access_token: string;
    refresh_token: string;
    details?: {
        username: string;
        email: string;
    };
}

export interface AdminState {
    user: User | null;
    setUser: (user: User | null) => void;
    isAuthChecked: boolean;
    setIsAuthChecked: (isAuthChecked: boolean) => void;
    error: string | null;
    setError: (error: string) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
    user: null,
    setUser: (user: User | null) => {
        if (user === null) {
            localStorage.removeItem(APP_CONFIG.app_code + '_user')
        } else {
            localStorage.setItem(APP_CONFIG.app_code + '_user', JSON.stringify(user as User))
            return set({user})
        }
    },
    isAuthChecked: false,
    setIsAuthChecked: (isAuthChecked: boolean) => set({isAuthChecked}),
    error: null,
    setError: (error: string) => set({error}),
}));