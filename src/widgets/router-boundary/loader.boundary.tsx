import { LoadingOutlined } from "@ant-design/icons"
import { Spin, type SpinProps, theme } from "antd"
import { type FC } from "react"

interface LoaderBoundaryProps extends SpinProps {
	loading?: boolean
}

const LoaderBoundary: FC<LoaderBoundaryProps> = ({ loading, ...props }) => {
	const { token } = theme.useToken()
	
	return (
		<>
			<Spin
				fullscreen={true}
				indicator={<LoadingOutlined style={{ fontSize: token.fontSizeHeading1 }} />}
				spinning={loading}
				{...props}
			/>
		</>
	)
}

export { LoaderBoundary }