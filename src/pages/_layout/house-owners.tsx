import { createFileRoute, Link } from "@tanstack/react-router"
import { Table, Tag } from "antd"
import dayjs from "dayjs"
import { PageHeader } from "src/widgets/shared"

export const Route = createFileRoute("/_layout/house-owners")({
	component: RouteComponent,
})

const districts = ["Алмалинский", "Бостандыкский", "Медеуский", "Турксибский", "Жетысуский", "Ауэзовский"]
const streets = ["Абая", "Достык", "Саина", "Толе би", "Назарбаева", "Аль-Фараби", "Кабанбай батыра", "Желтоксан"]

const firstNames = ["Айдар", "Бахыт", "Данияр", "Ерлан", "Жанар", "Канат", "Марат", "Нурлан", "Олжас", "Серик"]
const lastNames = ["Алиев", "Беков", "Даулетов", "Ермеков", "Жумабеков", "Касымов", "Муканов", "Нургалиев", "Омаров", "Сейтов"]
const middleNames = ["Абдуллаевич", "Бахытжанович", "Даниярович", "Ерланович", "Жанарович", "Канатович", "Маратович", "Нурланович", "Олжасович", "Серикович"]

// Генерируем данные о домовладельцах
const generateHouseOwnersData = () => {
	return Array.from({ length: 30 }, (_, index) => {
		const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
		const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
		const middleName = middleNames[Math.floor(Math.random() * middleNames.length)]
		const operatorCodes = [90, 91, 93, 94, 95, 97, 98, 99]
		const operatorCode = operatorCodes[Math.floor(Math.random() * operatorCodes.length)]
		const phoneNumber = `+998 ${operatorCode} ${100 + Math.floor(Math.random() * 900)} ${10 + Math.floor(Math.random() * 90)} ${10 + Math.floor(Math.random() * 90)}`
		const district = districts[Math.floor(Math.random() * districts.length)]
		const street = streets[Math.floor(Math.random() * streets.length)]
		const houseNumber = Math.floor(Math.random() * 200) + 1
		const apartmentNumber = Math.floor(Math.random() * 100) + 1
		
		// Генерируем дату рождения (от 25 до 70 лет назад)
		const birthDate = dayjs()
			.subtract(25 + Math.floor(Math.random() * 45), "year")
			.subtract(Math.floor(Math.random() * 365), "day")
			.format("YYYY-MM-DD")
		
		return {
			key: index + 1,
			owner_id: index + 1,
			fullName: `${lastName} ${firstName} ${middleName}`,
			phone: phoneNumber,
			birthDate,
			district,
			street,
			houseNumber,
			apartmentNumber,
			address: `${district}, ${street}, д. ${houseNumber}${apartmentNumber > 0 ? `, кв. ${apartmentNumber}` : ""}`,
			actsCount: Math.floor(Math.random() * 5),
		}
	})
}

const houseOwnersData = generateHouseOwnersData()

function RouteComponent() {
	return (
		<>
			<PageHeader
				title={"Домовладельцы"}
				breadcrumb={[
					{
						key: "/",
						title: <Link to={"/"}>Главная</Link>,
					},
					{
						key: "/house-owners",
						title: "Домовладельцы",
					},
				]}
			/>
			<Table
				dataSource={houseOwnersData}
				columns={[
					{
						title: "ФИО",
						dataIndex: "fullName",
						key: "fullName",
						width: 250,
					},
					{
						title: "Номер телефона",
						dataIndex: "phone",
						key: "phone",
						width: 180,
					},
					{
						title: "Дата рождения",
						dataIndex: "birthDate",
						key: "birthDate",
						width: 150,
						render: (date: string) => dayjs(date).format("D MMMM YYYY"),
						sorter: (a, b) => dayjs(a.birthDate).unix() - dayjs(b.birthDate).unix(),
					},
					{
						title: "Адрес",
						dataIndex: "address",
						key: "address",
						width: 300,
						render: (_: unknown, record: typeof houseOwnersData[0]) => (
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
						title: "Количество актов написано",
						dataIndex: "actsCount",
						key: "actsCount",
						width: 200,
						render: (value: number) => (
							<Tag color={value > 0 ? "red" : "default"}>
								{value}
							</Tag>
						),
						sorter: (a, b) => a.actsCount - b.actsCount,
					},
				]}
			/>
		</>
	)
}
