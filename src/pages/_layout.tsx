import { createFileRoute, Outlet } from "@tanstack/react-router"
import { Layout } from "antd"
import { FooterLayout, HeaderLayout, MainLayout, SidebarLayout } from "src/widgets/layout"
import { ContentLayout } from "src/widgets/layout/content.layout.tsx"

export const Route = createFileRoute("/_layout")({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<>
			<MainLayout>
				<SidebarLayout />
				<Layout>
					<HeaderLayout />
					<ContentLayout>
						<Outlet />
					</ContentLayout>
					<FooterLayout />
				</Layout>
			</MainLayout>
		</>
	)
}
