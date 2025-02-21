import {create} from "zustand/react";
export interface User {
    aT: string;
    rT: string;
    details?: {
        username: string;
        email: string;
    };
}
export interface AdminState {
    user: User | null;
    setUser: (user: User) => void;
    isAuthChecked: boolean;
    setIsAuthChecked: (isAuthChecked: boolean) => void;
    error: string | null;
    setError: (error: string) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
    user: null,
    setUser: (user: User) => set({user}),
    isAuthChecked: false,
    setIsAuthChecked: (isAuthChecked: boolean) => set({isAuthChecked}),
    error: null,
    setError: (error: string) => set({error}),
}));