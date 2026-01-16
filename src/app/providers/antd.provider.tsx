import { App, ConfigProvider, theme } from "antd"
import { type FC, type PropsWithChildren } from "react"

const AntdProvider: FC<PropsWithChildren> = ({ children }) => {
	const { token } = theme.useToken()

	return (
		<>
			<ConfigProvider
				theme={{
					token: {
						colorPrimary: "rgb(15, 98, 106)",
						colorPrimaryBg: "rgba(15, 98, 106, 0.2)",
						colorBorder: "rgba(15, 98, 106, 0.2)",
						fontFamily: `"Rubik", ${token.fontFamily}`,
						boxShadowTertiary: "0 1.6px 8px 0 rgba(40, 35, 45, 0.1)",
						colorTextDescription: "rgba(33, 37, 41, 0.75)",
					},
				}}
				typography={{
					style: {
						marginBottom: 0,
						marginTop: 0,
					},
				}}
			>
				<App>{children}</App>
			</ConfigProvider>
		</>
	)
}

export { AntdProvider }
