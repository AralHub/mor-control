import { type  FC, type PropsWithChildren } from "react"
import { AntdProvider } from "./antd.provider.tsx"
import { AuthProvider } from "./auth.provider.tsx"

const Providers: FC<PropsWithChildren> = ({ children }) => {
	return (
		<>
			<AntdProvider>
				<AuthProvider>
					{children}
				</AuthProvider>
			</AntdProvider>
		</>
	)
}

export { Providers }