import { AppstoreAddOutlined, BellOutlined, MoonOutlined, SearchOutlined } from "@ant-design/icons"
import { Badge, Button, ConfigProvider, Flex, Input, Layout, Space, theme } from "antd"
import { useResponsive } from "antd-style"
import { type FC } from "react"
import { MenuButton } from "src/widgets/actions/menu.button.tsx"

const HeaderLayout: FC = () => {
	const { token } = theme.useToken()
	const { md } = useResponsive()
	
	return (
		<>
			<ConfigProvider
				theme={{
					components: {
						Layout: {
							headerHeight: 65,
						},
					},
				}}
			>
				<Layout.Header
					style={{
						backgroundColor: token.colorBgContainer,
						boxShadow: token.boxShadowTertiary,
						paddingInline: md ? 40 : token.padding,
						lineHeight: 1,
						display: "flex",
						position: "sticky",
						top: 0,
						left: 0,
						right: 0,
						zIndex: 10,
					}}
				>
					<Flex
						align={"center"}
						justify={"space-between"}
						flex={1}
					>
						<Space>
							<MenuButton />
							<Input
								variant={"borderless"}
								prefix={<SearchOutlined />}
								placeholder={"Search..."}
							/>
						</Space>
						<Space>
							{/*<Dropdown*/}
							{/*	menu={{*/}
							{/*		items: [*/}
							{/*			{*/}
							{/*				k*/}
							{/*			}*/}
							{/*		]*/}
							{/*	}}*/}
							{/*>*/}
							{/*	<Button*/}
							{/*		shape={"circle"}*/}
							{/*		variant={"filled"}*/}
							{/*		color={"default"}*/}
							{/*		size={"large"}*/}
							{/*		icon={"EN"}*/}
							{/*	/>*/}
							{/*</Dropdown>*/}
							<Button
								shape={"circle"}
								variant={"filled"}
								color={"default"}
								size={"large"}
								icon={<AppstoreAddOutlined />}
							/>
							<Button
								shape={"circle"}
								variant={"filled"}
								color={"default"}
								size={"large"}
								icon={<MoonOutlined />}
							/>
							<Badge
								status={"processing"}
								color={"green"}
								dot={true}
								styles={{
									indicator: {
										translate: "-75% 75%",
										width: 10,
										height: 10,
									},
								}}
							>
								<Button
									shape={"circle"}
									variant={"filled"}
									color={"default"}
									size={"large"}
									icon={<BellOutlined />}
								/>
							</Badge>
						</Space>
					</Flex>
				</Layout.Header>
			</ConfigProvider>
		</>
	)
}

export { HeaderLayout }
