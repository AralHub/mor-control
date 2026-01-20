import { PlusOutlined, UserOutlined } from "@ant-design/icons"
import { createFileRoute, Link } from "@tanstack/react-router"
import { Button, Table } from "antd"
import { PageHeader } from "src/widgets/shared"

export const Route = createFileRoute("/_layout/employees")({
	component: RouteComponent,
})

const data = Array.from({ length: 9 })
	.map((_v, index) => ({
		id: index + 1,
		name: "Джастин Гейджи",
	}))
	.reverse()

function RouteComponent() {
	return (
		<>
			<PageHeader
				title={"Инспектор"}
				breadcrumb={[
					{
						key: "/",
						title: <Link to={"/"}>Главная</Link>,
					},
					{
						key: "/employees",
						title: "Инспектор",
					},
				]}
				extra={
					<Button
						icon={<PlusOutlined />}
						type={"primary"}
					>
						Добавить инспектора
					</Button>
				}
			/>
			<Table
				dataSource={data}
				columns={[
					{
						width: 100,
						title: "Фото",
						dataIndex: "image",
						key: "image",
						render: () => <UserOutlined style={{ fontSize: 50 }} />,
					},
					{
						title: "ФИО",
						dataIndex: "name",
						key: "name",
					},
					{
						title: "Опции",
						key: "options",
						dataIndex: "options",
						render: () => (
							<Link to="/inspectorInfo">
								<Button>посмотреть</Button>
							</Link>
						),
						align: "end",
					},
				]}
			/>
		</>
	)
}
