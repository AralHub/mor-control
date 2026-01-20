import { type  FC, type PropsWithChildren, useState } from "react"
import { AuthContext } from "src/shared/context"
import { tokenStorage } from "src/shared/utils"

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const [isAuth, setIsAuth] = useState(() => !!tokenStorage.get())
	
	const login: AuthContext["login"] = (token, remember) => {
		tokenStorage.set(token, remember)
		setIsAuth(true)
	}
	
	const logout: AuthContext["logout"] = () => {
		tokenStorage.clear()
		setIsAuth(false)
	}
	
	const refresh: AuthContext["refresh"] = () => {
		setIsAuth(() => !!tokenStorage.get())
	}
	
	return (
		<>
			<AuthContext.Provider value={{
				isAuth,
				login,
				logout,
				refresh,
			}}>
				{children}
			</AuthContext.Provider>
		</>
	)
}

export { AuthProvider }