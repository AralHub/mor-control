import {
	CheckCircleOutlined,
	CloseCircleOutlined,
	FileAddOutlined,
	GoldOutlined,
	HomeOutlined, QuestionCircleOutlined,
	ScheduleOutlined,
	ShopOutlined,
	TeamOutlined,
} from "@ant-design/icons"
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
		key: "Checklist",
		type: "group",
		label: "Чек лист",
	},
	{
		key: "/checklist",
		icon: <ScheduleOutlined />,
		label: <Link to={"/checklist"}>Проверочный лист</Link>,
	},
	{
		key: "/checked-houses",
		icon: <CheckCircleOutlined />,
		label: <Link to={"/checked-houses"}>Проверенные</Link>,
	},
	{
		key: "/unchecked-houses",
		icon: <CloseCircleOutlined />,
		label: <Link to={"/unchecked-houses"}>Не проверенные</Link>,
	},
	{
		key: "/empty-houses",
		icon: <QuestionCircleOutlined />,
		label: <Link to={"/empty-houses"}>Пустые дома</Link>,
	},
	{
		key: "/acts",
		icon: <FileAddOutlined />,
		label: <Link to={"/acts"}>Акты</Link>,
	},
	{
		key: "Houses",
		type: "group",
		label: "Дома",
	},
	{
		key: "/houses",
		icon: <ShopOutlined />,
		label: <Link to={"/houses"}>Список домов</Link>,
	},
	{
		key: "/house-owners",
		icon: <TeamOutlined />,
		label: <Link to={"/house-owners"}>Домовладельцы</Link>,
	},
	{
		key: "/house-committee",
		icon: <TeamOutlined />,
		label: <Link to={"/house-committee"}>Дом. комитеты</Link>,
	},
	{
		key: "Pages",
		type: "group",
		label: "Информация",
	},
	{
		key: "/employees",
		icon: <TeamOutlined />,
		label: <Link to={"/employees"}>Инспекторы</Link>,
	},
	{
		key: "/companies",
		icon: <GoldOutlined />,
		label: <Link to={"/companies"}>Компании</Link>,
	},
]
