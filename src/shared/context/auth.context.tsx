import { createContext } from "react"

export type AuthContext = {
	isAuth: boolean
	login: (token: string, remember?: boolean) => void
	logout: () => void
	refresh: () => void
}

export const AuthContext = createContext<AuthContext | null>(null)