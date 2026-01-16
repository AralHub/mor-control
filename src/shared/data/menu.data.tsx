import { HomeOutlined, ScheduleOutlined, TeamOutlined } from "@ant-design/icons"
import { Link } from "@tanstack/react-router"
import type { MenuProps } from "antd"

export type MenuItem = Required<MenuProps>["items"][number]

export const menuData: MenuItem[] = [
	{
		key: "Dashboard",
		type: "group",
		label: "Dashboard",
	},
	{
		key: "/",
		icon: <HomeOutlined />,
		label: <Link to={"/"}>Dashboard</Link>,
	},
	{
		key: "Pages",
		type: "group",
		label: "Pages",
	},
	{
		key: "/employees",
		icon: <TeamOutlined />,
		label: <Link to={"/employees"}>Employees</Link>,
	},
	{
		key: "/checklist",
		icon: <ScheduleOutlined />,
		label: <Link to={"/checklist"}>Checklist</Link>,
	},
]
