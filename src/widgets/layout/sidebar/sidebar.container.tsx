import { Drawer, Layout } from "antd"
import { useResponsive } from "antd-style"
import { type FC, type PropsWithChildren, useMemo } from "react"
import { useMenuStore } from "src/shared/store"

const SidebarContainer: FC<PropsWithChildren> = ({ children }) => {
	const { md, xl } = useResponsive()
	
	const { isCollapsed, toggleCollapsed } = useMenuStore()
	
	const collapsed = useMemo(() => {
		if (xl) return isCollapsed
		if (!md) return isCollapsed
		
		return !xl
	}, [isCollapsed, md, xl])
	
	if (!md)
		return (
			<Drawer
				closable={false}
				onClose={toggleCollapsed}
				open={collapsed}
				placement={"left"}
				size={272}
				styles={{
					body: {
						padding: 0,
					},
				}}
			>
				{children}
			</Drawer>
		)
	
	return (
		<>
			<Layout.Sider
				collapsed={collapsed}
				theme={"light"}
				width={288}
				style={{
					boxShadow: "0 -12.8px 19.2px rgba(40, 35, 45, 0.1)",
					position: "sticky",
					top: 0,
					left: 0,
					bottom: 0,
					zIndex: 10,
					height: "100vh"
				}}
			>
				{children}
			</Layout.Sider>
		</>
	)
}

export { SidebarContainer }
