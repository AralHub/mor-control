import type { LayoutProps } from "antd"
import { Layout } from "antd"
import { type FC } from "react"

const MainLayout: FC<LayoutProps> = ({ children, style, ...props }) => {
	return (
		<>
			<Layout
				hasSider={true}
				style={{
					minHeight: "100vh",
					...style,
				}}
				{...props}
			>
				{children}
			</Layout>
		</>
	)
}

export { MainLayout }
