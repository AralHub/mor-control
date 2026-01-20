import { Flex, Image, Typography } from "antd"
import type { TitleProps } from "antd/es/typography/Title"
import { type FC } from "react"

interface LogoProps extends TitleProps {
	collapsed?: boolean
}

const Logo: FC<LogoProps> = ({ style, collapsed, ...props }) => {
	// const { token } = theme.useToken()
	
	return (
		<>
			<Flex gap={8} align={"center"} justify={"center"}>
				<Image
					src={"/icon.svg"}
					fallback={"/public/icon.svg"}
					width={40}
					height={40}
					style={{
						minWidth: 40,
					}}
				/>
				
				<Typography.Title
					style={{
						textTransform: "uppercase",
						textAlign: "center",
						fontWeight: 700,
						lineHeight: 1,
						whiteSpace: "nowrap",
						...style,
					}}
					level={2}
					hidden={collapsed}
					{...props}
				>
					- Safe
				</Typography.Title>
			</Flex>
		</>
	)
}

export { Logo }
