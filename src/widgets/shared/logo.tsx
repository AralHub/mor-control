import { theme, Typography } from "antd"
import type { TitleProps } from "antd/es/typography/Title"
import { type FC } from "react"

interface LogoProps extends TitleProps {
	collapsed?: boolean
}

const Logo: FC<LogoProps> = ({ style, collapsed, ...props }) => {
	const { token } = theme.useToken()

	return (
		<>
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
				{...props}
			>
				{collapsed ? (
					<span style={{ fontSize: "inherit", color: token.colorPrimary, lineHeight: 1 }}>G</span>
				) : (
					<>
						<span style={{ fontSize: "inherit", color: token.colorPrimary, lineHeight: 1 }}>G</span>{" "}
						- Safe
					</>
				)}
			</Typography.Title>
		</>
	)
}

export { Logo }
