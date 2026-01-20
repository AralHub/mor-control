import { EyeOutlined } from "@ant-design/icons"
import { createFileRoute, Link } from "@tanstack/react-router"
import { Button, Table, Tag } from "antd"
import dayjs from "dayjs"
import { PageHeader } from "src/widgets/shared"

export const Route = createFileRoute("/_layout/houses")({
	component: RouteComponent,
})

const houseTypes = [
	"Дом",
	"Квартира",
	"Многокомнатный дом",
	"Таунхаус",
	"Коттедж",
	"Дача",
]

const districts = ["Алмалинский", "Бостандыкский", "Медеуский", "Турксибский", "Жетысуский", "Ауэзовский"]
const streets = ["Абая", "Достык", "Саина", "Толе би", "Назарбаева", "Аль-Фараби", "Кабанбай батыра", "Желтоксан"]

const firstNames = ["Айдар", "Бахыт", "Данияр", "Ерлан", "Жанар", "Канат", "Марат", "Нурлан", "Олжас", "Серик"]
const lastNames = ["Алиев", "Беков", "Даулетов", "Ермеков", "Жумабеков", "Касымов", "Муканов", "Нургалиев", "Омаров", "Сейтов"]
const middleNames = ["Абдуллаевич", "Бахытжанович", "Даниярович", "Ерланович", "Жанарович", "Канатович", "Маратович", "Нурланович", "Олжасович", "Серикович"]

// Генерируем данные о домах
const generateHousesData = () => {
	return Array.from({ length: 30 }, (_, index) => {
		const ownerFirstName = firstNames[Math.floor(Math.random() * firstNames.length)]
		const ownerLastName = lastNames[Math.floor(Math.random() * lastNames.length)]
		const ownerMiddleName = middleNames[Math.floor(Math.random() * middleNames.length)]
		const district = districts[Math.floor(Math.random() * districts.length)]
		const street = streets[Math.floor(Math.random() * streets.length)]
		const houseNumber = Math.floor(Math.random() * 200) + 1
		const apartmentNumber = Math.floor(Math.random() * 100) + 1
		
		return {
			key: index + 1,
			house_id: index + 1,
			ownerFullName: `${ownerLastName} ${ownerFirstName} ${ownerMiddleName}`,
			houseType: houseTypes[Math.floor(Math.random() * houseTypes.length)],
			district,
			street,
			houseNumber,
			apartmentNumber,
			address: `${district}, ${street}, д. ${houseNumber}${apartmentNumber > 0 ? `, кв. ${apartmentNumber}` : ""}`,
			houseCommittee: `Дом ком ${Math.floor(Math.random() * 50) + 1}`,
			checksCount: Math.floor(Math.random() * 20) + 1,
			warningsCount: Math.floor(Math.random() * 5),
			actsCount: Math.floor(Math.random() * 3),
			lastCheckDate: dayjs()
				.subtract(Math.floor(Math.random() * 90), "day")
				.hour(Math.floor(Math.random() * 24))
				.minute(Math.floor(Math.random() * 60))
				.second(Math.floor(Math.random() * 60))
				.format("YYYY-MM-DD HH:mm:ss"),
		}
	})
}

const housesData = generateHousesData()

function RouteComponent() {
	// const navigate = useNavigate()

	const handleOpenHouse = (houseId: number) => {
		// Здесь будет навигация к деталям дома
		// navigate({ to: `/houses/${houseId}` })
		console.log("Opening house:", houseId)
	}

	return (
		<>
			<PageHeader
				title={"Дома"}
				breadcrumb={[
					{
						key: "/",
						title: <Link to={"/"}>Главная</Link>,
					},
					{
						key: "/houses",
						title: "Дома",
					},
				]}
			/>
			<Table
				dataSource={housesData}
				columns={[
					{
						title: "ФИО домовладельца",
						dataIndex: "ownerFullName",
						key: "ownerFullName",
						width: 200,
					},
					{
						title: "Тип дома",
						dataIndex: "houseType",
						key: "houseType",
						width: 150,
					},
					{
						title: "Адрес",
						dataIndex: "address",
						key: "address",
						width: 250,
						render: (_: unknown, record: typeof housesData[0]) => (
							<div>
								<div>{record.district}</div>
								<div style={{ fontSize: "12px", color: "#666" }}>
									{record.street}, д. {record.houseNumber}
									{record.apartmentNumber > 0 ? `, кв. ${record.apartmentNumber}` : ""}
								</div>
							</div>
						),
					},
					{
						title: "Дом. комитет",
						dataIndex: "houseCommittee",
						key: "houseCommittee",
						width: 120,
					},
					{
						title: "Кол-во проверок",
						dataIndex: "checksCount",
						key: "checksCount",
						width: 130,
						render: (value: number) => (
							<Tag color={"blue"}>
								{value}
							</Tag>
						),
						sorter: (a, b) => a.checksCount - b.checksCount,
					},
					{
						title: "Кол-во предупреждений",
						dataIndex: "warningsCount",
						key: "warningsCount",
						width: 160,
						render: (value: number) => (
							<Tag color={value > 0 ? "orange" : "default"}>
								{value}
							</Tag>
						),
						sorter: (a, b) => a.warningsCount - b.warningsCount,
					},
					{
						title: "Кол-во написанных актов",
						dataIndex: "actsCount",
						key: "actsCount",
						width: 170,
						render: (value: number) => (
							<Tag color={value > 0 ? "red" : "default"}>
								{value}
							</Tag>
						),
						sorter: (a, b) => a.actsCount - b.actsCount,
					},
					{
						title: "Дата последней проверки",
						dataIndex: "lastCheckDate",
						key: "lastCheckDate",
						width: 180,
						render: (date: string) => dayjs(date).format("D MMMM YYYY, HH:mm:ss"),
						sorter: (a, b) => dayjs(a.lastCheckDate).unix() - dayjs(b.lastCheckDate).unix(),
					},
					{
						title: "Действия",
						key: "actions",
						fixed: "right",
						align: "center",
						width: 100,
						render: (_: unknown, record: typeof housesData[0]) => (
							<Button
								type={"primary"}
								icon={<EyeOutlined />}
								onClick={() => handleOpenHouse(record.house_id)}
							>
								Открыть
							</Button>
						),
					},
				]}
				scroll={{ x: "auto" }}
			/>
		</>
	)
}
