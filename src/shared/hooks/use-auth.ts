import { useContext } from "react"
import { AuthContext } from "src/shared/context"

export const useAuth = () => {
	const auth = useContext(AuthContext)
	
	if (!auth) {
		throw new Error("Auth context is null")
	}
	
	return auth
}