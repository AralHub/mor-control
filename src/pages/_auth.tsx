import { createFileRoute, Outlet } from "@tanstack/react-router"
import { Flex, Layout, theme } from "antd"

export const Route = createFileRoute("/_auth")({
	component: RouteComponent,
})

function RouteComponent() {
	const { token } = theme.useToken()
	
	return (
		<>
			<Layout
				style={{
					minHeight: "100vh",
					backgroundImage: "url(/assets/auth/auth-bg.jpg)",
					backgroundPosition: "center",
					backgroundSize: "cover",
				}}
			>
				<Flex
					flex={1}
					justify={"center"}
					align={"center"}
					style={{
						padding: token.padding,
					}}
				>
					<Outlet />
				</Flex>
			</Layout>
		</>
	)
}
