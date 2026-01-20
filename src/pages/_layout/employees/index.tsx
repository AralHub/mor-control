import { EyeOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons"
import { createFileRoute, Link } from "@tanstack/react-router"
import { Button, Table } from "antd"
import { PageHeader } from "src/widgets/shared"

export const Route = createFileRoute("/_layout/employees/")({
	component: RouteComponent,
})


const data = Array.from({ length: 9 })
	.map((_v, index) => ({
		id: index + 1,
		name: "Palensheev Tolenshe",
		phone: "+998 90 322-33-32",
	}))
	.reverse()

function RouteComponent() {
	return (
		<>
			<PageHeader
				title={"Инспекторы"}
				breadcrumb={[
					{
						key: "/",
						title: <Link to={"/"}>Главная</Link>,
					},
					{
						key: "/employees",
						title: "Инспекторы",
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
						title: "Телефон",
						dataIndex: "phone",
						key: "phone",
					},
					{
						align: "end",
						title: "Опции",
						key: "options",
						dataIndex: "options",
						render: (_v, record) => (
							<Link to={"/employees/$employeeId"} params={{
								employeeId: `${record?.id}`,
							}}>
								<Button type={"primary"} icon={<EyeOutlined />}>Открыть</Button>
							</Link>
						),
					},
				]}
			/>
		</>
	)
}
