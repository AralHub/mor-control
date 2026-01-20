import { RouterProvider } from "@tanstack/react-router"
import { type FC } from "react"
import { useAuth } from "src/shared/hooks"
import { router } from "./router.tsx"

const App: FC = () => {
	const auth = useAuth()
	
	return (
		<>
			<RouterProvider router={router} context={{ auth }} />
		</>
	)
}

export { App }