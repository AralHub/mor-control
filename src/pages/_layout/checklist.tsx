import { SyncOutlined, UserOutlined } from "@ant-design/icons"
import { createFileRoute, Link } from "@tanstack/react-router"
import { Button, Table, Tag } from "antd"
import { PageHeader } from "src/widgets/shared"

export const Route = createFileRoute("/_layout/checklist")({
	component: RouteComponent,
})

const data = Array.from({ length: 9 })
	.map((_v, index) => ({
		check_id: index + 1,
		house: index + 1,
		status: index % 5 === 0 ? "red" : index % 7 === 0 ? "orange" : "green",
		date: `2026-01-0${1 + index}`,
		inspector: "Palensheev Tolenshe",
	}))
	.reverse()

function RouteComponent() {
	return (
		<>
			<PageHeader
				title={"Проверочный лист"}
				breadcrumb={[
					{
						key: "/",
						title: <Link to={"/"}>Главная</Link>,
					},
					{
						key: "/checklist",
						title: "Проверочный лист",
					},
				]}
				extra={
					<Button
						type={"primary"}
						icon={<SyncOutlined />}
					>
						Синхронизация
					</Button>
				}
			/>
			<Table
				dataSource={data}
				columns={[
					{
						width: 100,
						title: "ID",
						dataIndex: "check_id",
						key: "check_id",
						render: (value) => `№${value}`,
					},
					{
						title: "Дом",
						dataIndex: "house",
						key: "house",
						render: (value) => `Дом №${value}`,
					},
					{
						title: "Статус",
						dataIndex: "status",
						key: "status",
						render: (status: "green" | "red" | "orange") =>
							status === "red" ? (
								<Tag
									color={"red"}
									variant={"solid"}
								>
									Не проверено
								</Tag>
							) : status === "orange" ? (
								<Tag
									color={"orange"}
									variant={"solid"}
								>
									Уведомлено
								</Tag>
							) : (
								<Tag
									color={"green"}
									variant={"solid"}
								>
									Проверено
								</Tag>
							),
					},
					{
						title: "Дата",
						dataIndex: "date",
						key: "date",
					},
					{
						title: "Инспектор",
						dataIndex: "inspector",
						key: "inspector",
					},
					{
						title: "Фото",
						dataIndex: "image",
						key: "image",
						render: () => <UserOutlined style={{ fontSize: 50 }} />,
					},
				]}
			/>
		</>
	)
}
