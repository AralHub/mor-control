import { RouterProvider } from "@tanstack/react-router"
import { type FC } from "react"
import { router } from "./router.tsx"

const App: FC = () => {
	return (
		<>
			<RouterProvider router={router} />
		</>
	)
}

export { App }