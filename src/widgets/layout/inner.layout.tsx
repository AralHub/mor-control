import { Layout, type LayoutProps } from "antd"
import { type FC } from "react"

const InnerLayout: FC<LayoutProps> = ({ children, ...props }) => {
	return (
		<>
			<Layout
				hasSider={false}
				{...props}
			>
				{children}
			</Layout>
		</>
	)
}

export { InnerLayout }
