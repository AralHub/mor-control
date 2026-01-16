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
					<span style={{ fontSize: "inherit", color: token.colorPrimary, lineHeight: 1 }}>MA</span>
				) : (
					<>
						<span style={{ fontSize: "inherit", color: token.colorPrimary, lineHeight: 1 }}>
							MOR
						</span>{" "}
						- Admin
					</>
				)}
			</Typography.Title>
		</>
	)
}

export { Logo }
