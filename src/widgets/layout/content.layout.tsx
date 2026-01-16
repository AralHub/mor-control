import { Flex, Layout, theme } from "antd"
import type { BasicProps } from "antd/es/layout/layout"
import { type FC } from "react"

const ContentLayout: FC<BasicProps> = ({ children, ...props }) => {
	const { token } = theme.useToken()

	return (
		<>
			<Layout.Content {...props}>
				<Flex
					vertical={true}
					gap={token.paddingLG}
					style={{
						padding: token.paddingLG,
					}}
				>
					{children}
				</Flex>
			</Layout.Content>
		</>
	)
}

export { ContentLayout }
