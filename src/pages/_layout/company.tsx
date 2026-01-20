import { PlusOutlined } from "@ant-design/icons"
import { createFileRoute, Link } from "@tanstack/react-router"
import { Button, Table } from "antd"
import { PageHeader } from "src/widgets/shared"

export const Route = createFileRoute("/_layout/company")({
	component: RouteComponent,
})

const data = Array.from({ length: 9 })
	.map((_v, index) => ({
		id: index + 1,
		name: `Company ${index + 1}`,
		tin: "324234223",
		telefon: "+998 94 231-23-23",
		director: "Макс Холоуэй",
		address: "Жуманазаров 45",
	}))
	.reverse()

function RouteComponent() {
	return (
		<>
			<PageHeader
				title={"Компания"}
				breadcrumb={[
					{
						key: "/",
						title: <Link to={"/"}>Главная</Link>,
					},
					{
						key: "/employees",
						title: "Компания",
					},
				]}
				extra={
					<Button
						icon={<PlusOutlined />}
						type={"primary"}
					>
						Добавить Компанию
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
						dataIndex: "telefon",
						key: "telefon",
					},
				]}
			/>
		</>
	)
}
