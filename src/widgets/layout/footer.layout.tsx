import { Layout, theme, Typography } from "antd"
import { type FC } from "react"

const FooterLayout: FC = () => {
	const { token } = theme.useToken()

	return (
		<>
			<Layout.Footer
				style={{
					backgroundColor: token.colorBgContainer,
					padding: `${token.paddingSM}px 40px`,
					borderTop: `1px solid rgba(98, 98, 98, 0.05)`,
					boxShadow: token.boxShadowTertiary,
				}}
			>
				<Typography.Paragraph
					strong={true}
					style={{ color: "#082f32" }}
				>
					Copyright © {new Date().getFullYear()} G-Safe. All rights reserved
				</Typography.Paragraph>
			</Layout.Footer>
		</>
	)
}

export { FooterLayout }
