import { createRouter } from "@tanstack/react-router"
import { routeTree } from "src/pageTree.gen.ts"
import { ErrorBoundary, LoaderBoundary, NotFoundBoundary } from "src/widgets/router-boundary"

export const router = createRouter({
	routeTree,
	context: {
		auth: undefined,
	},
	defaultPreload: "intent",
	defaultPreloadStaleTime: 0,
	scrollRestoration: true,
	defaultPendingComponent: () => <LoaderBoundary loading={true} />,
	defaultNotFoundComponent: NotFoundBoundary,
	defaultErrorComponent: ErrorBoundary,
})

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router
	}
}
