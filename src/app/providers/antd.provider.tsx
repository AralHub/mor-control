import { App, ConfigProvider, theme } from "antd"
import dayjs from "dayjs"
import { type FC, type PropsWithChildren } from "react"
import localeRU from "antd/locale/ru_RU"
import "dayjs/locale/ru.js"

dayjs.locale("ru")

const AntdProvider: FC<PropsWithChildren> = ({ children }) => {
	const { token } = theme.useToken()

	return (
		<>
			<ConfigProvider
				locale={localeRU}
				theme={{
					token: {
						colorPrimary: "rgb(32, 163, 158)",
						// colorPrimaryBg: "rgba(15, 98, 106, 0.2)",
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
