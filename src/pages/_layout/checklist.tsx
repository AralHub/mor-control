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
		status: index % 5 === 0 ? "red" : "green",
		date: `2026-01-0${1 + index}`,
		inspector: "Илья Топурияы",
	}))
	.reverse()

function RouteComponent() {
	return (
		<>
			<PageHeader
				title={"Чек лист"}
				breadcrumb={[
					{
						key: "/",
						title: <Link to={"/"}>Главная</Link>,
					},
					{
						key: "/checklist",
						title: "Чек лист",
					},
				]}
				extra={
					<Button
						type={"primary"}
						icon={<SyncOutlined />}
					>
						Sync
					</Button>
				}
			/>
			<Table
				dataSource={data}
				columns={[
					{
						width: 100,
						title: "Check ID",
						dataIndex: "check_id",
						key: "check_id",
						render: (value) => `№${value}`,
					},
					{
						title: "House",
						dataIndex: "house",
						key: "house",
						render: (value) => `House №${value}`,
					},
					{
						title: "Status",
						dataIndex: "status",
						key: "status",
						render: (status: "green" | "red") =>
							status === "red" ? (
								<Tag
									color={"red"}
									variant={"solid"}
								>
									Not Verified
								</Tag>
							) : (
								<Tag
									color={"green"}
									variant={"solid"}
								>
									Verified
								</Tag>
							),
					},
					{
						title: "Date",
						dataIndex: "date",
						key: "date",
					},
					{
						title: "Inspector",
						dataIndex: "inspector",
						key: "inspector",
					},
					{
						title: "Image",
						dataIndex: "image",
						key: "image",
						render: () => <UserOutlined style={{ fontSize: 50 }} />,
					},
				]}
			/>
		</>
	)
}
