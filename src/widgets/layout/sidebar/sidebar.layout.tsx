import { EllipsisOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons"
import { Link, useLocation, useNavigate } from "@tanstack/react-router"
import { Avatar, Button, ConfigProvider, Flex, Menu, Popover, theme, Typography } from "antd"
import { useResponsive } from "antd-style"
import { type FC, useMemo } from "react"
import { menuData } from "src/shared/data"
import { useMenuStore } from "src/shared/store"
import { Logo } from "src/widgets/shared"
import { SidebarContainer } from "./sidebar.container.tsx"

const SidebarLayout: FC = () => {
	const { token } = theme.useToken()
	const { md, xl } = useResponsive()
	const { pathname } = useLocation()
	const isCollapsed = useMenuStore((state) => state.isCollapsed)
	const navigate = useNavigate()

	const collapsed = useMemo(() => {
		if (!md) return false
		if (xl) return isCollapsed

		return !xl
	}, [isCollapsed, md, xl])

	const onLogout = () => {
		navigate({
			to: "/login",
			replace: true,
		})
	}

	const menuItems = useMemo(() => {
		if (collapsed)
			return menuData.map((el) => {
				if (el?.type === "group")
					return {
						...el,
						label: (
							<Flex justify={"center"}>
								<EllipsisOutlined style={{ fontSize: 20 }} />
							</Flex>
						),
					}
				return el
			})

		return menuData
	}, [collapsed])

	return (
		<>
			<SidebarContainer>
				<div
					style={{
						borderRight: `1px solid ${token.colorBorder}`,
					}}
				>
					<div
						style={{
							padding: token.padding,
							height: 65,
							maxHeight: 65,
						}}
					>
						<Link to={"/"}>
							<Logo collapsed={collapsed} />
						</Link>
					</div>
					<Popover
						trigger={"click"}
						placement={"right"}
						content={
							<Button
								icon={<LogoutOutlined />}
								danger={true}
								onClick={onLogout}
							>
								Logout
							</Button>
						}
					>
						<Flex
							style={{
								padding: token.padding,
								borderTop: `1px solid ${token.colorBorder}`,
								borderBottom: `1px solid ${token.colorBorder}`,
								cursor: "pointer",
							}}
							justify={xl ? "start" : "center"}
							gap={8}
						>
							<Avatar
								shape={"square"}
								size={45}
								icon={<UserOutlined />}
								style={{ backgroundColor: token.colorPrimary, flexShrink: 0 }}
							/>
							<div
								style={{ flex: 1 }}
								hidden={collapsed}
							>
								<Typography.Title
									level={5}
									style={{ color: token.colorPrimary, whiteSpace: "nowrap" }}
								>
									Admin
								</Typography.Title>
								<Typography.Paragraph
									type={"secondary"}
									style={{ whiteSpace: "nowrap" }}
								>
									+998 90 123 45 67
								</Typography.Paragraph>
							</div>
							<Flex
								hidden={collapsed}
								justify={"center"}
								align={"center"}
							>
								<Button
									shape={"circle"}
									type={"text"}
									size={"large"}
									icon={<SettingOutlined />}
								/>
							</Flex>
						</Flex>
					</Popover>
				</div>
				<nav>
					<ConfigProvider
						theme={{
							components: {
								Menu: {
									darkItemBg: "transparent",
									darkGroupTitleColor: token.colorPrimary,
									darkItemColor: "rgba(40, 35, 45,1)",
									darkItemHoverColor: "rgba(40, 35, 45,1)",
									itemHeight: 46,
									iconSize: 20,
									collapsedIconSize: 20,
								},
							},
						}}
					>
						<Menu
							mode={"inline"}
							inlineCollapsed={collapsed}
							selectedKeys={[pathname]}
							style={{
								paddingInline: token.paddingSM - 4,
							}}
							styles={{
								itemTitle: {
									fontWeight: 500,
									textTransform: "uppercase",
									paddingBlock: token.paddingSM,
									paddingInline: token.paddingXS + 4,
								},
								itemIcon: {
									fontSize: 20,
								},
								itemContent: {
									fontSize: 18,
									fontWeight: 500,
								},
							}}
							theme={"dark"}
							items={menuItems}
						/>
					</ConfigProvider>
				</nav>
			</SidebarContainer>
		</>
	)
}

export { SidebarLayout }
