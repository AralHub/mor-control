import { type  FC, type PropsWithChildren } from "react"
import { AntdProvider } from "./antd.provider.tsx"

const Providers: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<AntdProvider>
				{children}
			</AntdProvider>
		</>
	)
}

export { Providers }