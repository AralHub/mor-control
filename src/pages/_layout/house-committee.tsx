import { createFileRoute, Link } from "@tanstack/react-router"
import { Table, Tag } from "antd"
import { PageHeader } from "src/widgets/shared"

export const Route = createFileRoute("/_layout/house-committee")({
	component: RouteComponent,
})

const streets = [
	"Абая",
	"Достык",
	"Саина",
	"Толе би",
	"Назарбаева",
	"Аль-Фараби",
	"Кабанбай батыра",
	"Желтоксан",
	"Райымбека",
	"Карасай батыра",
	"Байтурсынова",
	"Кунаева",
	"Шевченко",
	"Гагарина",
	"Пушкина",
]

// Генерируем данные о домовых комитетах
const generateHouseCommitteesData = () => {
	return Array.from({ length: 15 }, (_, index) => {
		const committeeId = index + 1
		const totalHouses = Math.floor(Math.random() * 50) + 20
		const checkedHouses = Math.floor(totalHouses * (0.5 + Math.random() * 0.3))
		const uncheckedHouses = Math.floor((totalHouses - checkedHouses) * (0.3 + Math.random() * 0.3))
		const notifiedHouses = Math.floor((totalHouses - checkedHouses - uncheckedHouses) * (0.4 + Math.random() * 0.3))
		const emptyHouses = totalHouses - checkedHouses - uncheckedHouses - notifiedHouses
		
		// Генерируем список улиц для этого комитета (от 2 до 5 улиц)
		const streetsCount = Math.floor(Math.random() * 4) + 2
		const committeeStreets = [...streets]
			.sort(() => Math.random() - 0.5)
			.slice(0, streetsCount)
			.sort()
		
		return {
			key: committeeId,
			committee_id: committeeId,
			name: `Дом ком ${committeeId}`,
			totalHouses,
			checkedHouses,
			uncheckedHouses,
			notifiedHouses,
			emptyHouses,
			streets: committeeStreets,
		}
	})
}

const houseCommitteesData = generateHouseCommitteesData()

function RouteComponent() {
	return (
		<>
			<PageHeader
				title={"Домовые комитеты"}
				breadcrumb={[
					{
						key: "/",
						title: <Link to={"/"}>Главная</Link>,
					},
					{
						key: "/house-committee",
						title: "Домовые комитеты",
					},
				]}
			/>
			<Table
				dataSource={houseCommitteesData}
				columns={[
					{
						title: "Название дом ком",
						dataIndex: "name",
						key: "name",
						width: 150,
					},
					{
						title: "Количество домов",
						dataIndex: "totalHouses",
						key: "totalHouses",
						width: 150,
						render: (value: number) => (
							<Tag color={"blue"}>
								{value}
							</Tag>
						),
						sorter: (a, b) => a.totalHouses - b.totalHouses,
					},
					{
						title: "Количество проверенных домов",
						dataIndex: "checkedHouses",
						key: "checkedHouses",
						width: 220,
						render: (value: number) => (
							<Tag color={"green"}>
								{value}
							</Tag>
						),
						sorter: (a, b) => a.checkedHouses - b.checkedHouses,
					},
					{
						title: "Количество не проверенных домов",
						dataIndex: "uncheckedHouses",
						key: "uncheckedHouses",
						width: 250,
						render: (value: number) => (
							<Tag color={"red"}>
								{value}
							</Tag>
						),
						sorter: (a, b) => a.uncheckedHouses - b.uncheckedHouses,
					},
					{
						title: "Количество уведомовавших домов",
						dataIndex: "notifiedHouses",
						key: "notifiedHouses",
						width: 250,
						render: (value: number) => (
							<Tag color={"orange"}>
								{value}
							</Tag>
						),
						sorter: (a, b) => a.notifiedHouses - b.notifiedHouses,
					},
					{
						title: "Количество пустых домов",
						dataIndex: "emptyHouses",
						key: "emptyHouses",
						width: 200,
						render: (value: number) => (
							<Tag color={"gray"}>
								{value}
							</Tag>
						),
						sorter: (a, b) => a.emptyHouses - b.emptyHouses,
					},
					{
						title: "Улицы",
						dataIndex: "streets",
						key: "streets",
						width: 300,
						render: (streets: string[]) => (
							<div style={{ fontSize: "14px" }}>
								{streets.map((street, index) => (
									<span key={street}>
										{street}
										{index < streets.length - 1 ? ", " : ""}
									</span>
								))}
							</div>
						),
					},
				]}
				scroll={{ x: "auto" }}
			/>
		</>
	)
}
