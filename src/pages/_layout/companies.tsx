import { PlusOutlined } from "@ant-design/icons"
import { createFileRoute, Link } from "@tanstack/react-router"
import { Button, Table } from "antd"
import { PageHeader } from "src/widgets/shared"

export const Route = createFileRoute("/_layout/companies")({
	component: RouteComponent,
})

const data = Array.from({ length: 9 }).map((_v, index) => ({
	key: index + 1,
	id: index + 1,
	name: `Компания ${index + 1}`,
	tin: "324234223",
	phone: "+998 94 231-23-23",
	director: "Palensheev Tolenshe",
	address: "Жуманазаров 45",

	employeesCount: Math.floor(Math.random() * 80) + 20, // сотрудники
	inspectorsCount: Math.floor(Math.random() * 40) + 10, // инспекторы
	regDate: `201${index}-03-12`, // дата регистрации
	income: (Math.floor(Math.random() * 900) + 100) * 1_000_000, // доход
}))

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
				scroll={{ x: 1200 }}
				columns={[
					{
						title: "Компания",
						dataIndex: "name",
						key: "name",
						fixed: "left",
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
					{
						title: "Сотрудники",
						dataIndex: "employeesCount",
						key: "employeesCount",
					},
					{
						title: "Инспекторы",
						dataIndex: "inspectorsCount",
						key: "inspectorsCount",
					},
					{
						title: "Дата регистрации",
						dataIndex: "regDate",
						key: "regDate",
					},
					{
						title: "Доход",
						dataIndex: "income",
						key: "income",
						render: (v: number) => `${v.toLocaleString("ru-RU")} сум`,
					},
				]}
			/>
		</>
	)
}
