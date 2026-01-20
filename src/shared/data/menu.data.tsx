import { GoldOutlined, HomeOutlined, ScheduleOutlined, TeamOutlined } from "@ant-design/icons"
import { Link } from "@tanstack/react-router"
import type { MenuProps } from "antd"

export type MenuItem = Required<MenuProps>["items"][number]

export const menuData: MenuItem[] = [
	{
		key: "Dashboard",
		type: "group",
		label: "Главная",
	},
	{
		key: "/",
		icon: <HomeOutlined />,
		label: <Link to={"/"}>Главная</Link>,
	},
	{
		key: "Pages",
		type: "group",
		label: "Информация",
	},
	{
		key: "/employees",
		icon: <TeamOutlined />,
		label: <Link to={"/employees"}>Инспектор</Link>,
	},
	{
		key: "/checklist",
		icon: <ScheduleOutlined />,
		label: <Link to={"/checklist"}>Чек лист</Link>,
	},
	{
		key: "/company",
		icon: <GoldOutlined />,
		label: <Link to={"/company"}>Компания</Link>,
	},
]
