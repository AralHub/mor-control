import { PlusOutlined } from "@ant-design/icons"
import { createFileRoute, Link } from "@tanstack/react-router"
import { Button, Table } from "antd"
import { PageHeader } from "src/widgets/shared"

export const Route = createFileRoute("/_layout/companies")({
	component: RouteComponent,
})

const data = Array.from({ length: 9 })
	.map((_v, index) => ({
		id: index + 1,
		name: `Компания ${index + 1}`,
		tin: "324234223",
		phone: "+998 94 231-23-23",
		director: "Palensheev Tolenshe",
		address: "Жуманазаров 45",
	}))
	.reverse()

function RouteComponent() {
	return (
		<>
			<PageHeader
				title={"Компании"}
				breadcrumb={[
					{
						key: "/",
						title: <Link to={"/"}>Главная</Link>,
					},
					{
						key: "/companies",
						title: "Компании",
					},
				]}
				extra={
					<Button
						icon={<PlusOutlined />}
						type={"primary"}
					>
						Добавить компанию
					</Button>
				}
			/>
			<Table
				dataSource={data}
				columns={[
					{
						title: "Название компании",
						dataIndex: "name",
						key: "name",
					},
					{
						title: "ИНН",
						dataIndex: "tin",
						key: "tin",
					},
					{
						title: "Адрес",
						dataIndex: "address",
						key: "address",
					},
					{
						title: "Директор",
						dataIndex: "director",
						key: "director",
					},
					{
						title: "Телефон",
						dataIndex: "phone",
						key: "phone",
					},
				]}
			/>
		</>
	)
}
