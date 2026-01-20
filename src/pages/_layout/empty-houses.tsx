import { createFileRoute, Link } from "@tanstack/react-router"
import { DatePicker, Table, Tag } from "antd"
import dayjs, { type Dayjs } from "dayjs"
import { useState } from "react"
import { PageHeader } from "src/widgets/shared"

const { RangePicker } = DatePicker

export const Route = createFileRoute("/_layout/empty-houses")({
	component: RouteComponent,
})

const destinations = [
	"Алматы",
	"Астана",
	"Шымкент",
	"Актобе",
	"Караганда",
	"Тараз",
	"Усть-Каменогорск",
	"Павлодар",
	"Семей",
	"Турция",
	"Россия",
	"Дубай",
]

const houseStatuses = [
	{ label: "Люди живут", value: "occupied", color: "blue" },
	{ label: "Дом продается", value: "for_sale", color: "orange" },
	{ label: "Дом пуст", value: "empty", color: "gray" },
]

const firstNames = ["Айдар", "Бахыт", "Данияр", "Ерлан", "Жанар", "Канат", "Марат", "Нурлан", "Олжас", "Серик"]
const lastNames = ["Алиев", "Беков", "Даулетов", "Ермеков", "Жумабеков", "Касымов", "Муканов", "Нургалиев", "Омаров", "Сейтов"]

// Генерируем данные о пустых домах
const generateEmptyHousesData = () => {
	return Array.from({ length: 25 }, (_, index) => {
		const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
		const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
		const operatorCodes = [90, 91, 93, 94, 95, 97, 98, 99]
		const operatorCode = operatorCodes[Math.floor(Math.random() * operatorCodes.length)]
		const phoneNumber = `+998 ${operatorCode} ${100 + Math.floor(Math.random() * 900)} ${10 + Math.floor(Math.random() * 90)} ${10 + Math.floor(Math.random() * 90)}`
		const destination = destinations[Math.floor(Math.random() * destinations.length)]
		const status = houseStatuses[Math.floor(Math.random() * houseStatuses.length)]
		
		// Генерируем период отъезда (от 1 до 6 месяцев)
		const departureDate = dayjs().subtract(Math.floor(Math.random() * 30), "day")
		const returnDate = departureDate.add(Math.floor(Math.random() * 180) + 30, "day")
		
		return {
			key: index + 1,
			house_id: index + 1,
			address: `Улица ${index + 1}, дом ${index + 1}`,
			owner: `${firstName} ${lastName}`,
			phone: phoneNumber,
			destination,
			departureDate: departureDate.format("YYYY-MM-DD"),
			returnDate: returnDate.format("YYYY-MM-DD"),
			status: status.value,
			statusLabel: status.label,
			statusColor: status.color,
			lastCheckDate: dayjs()
				.subtract(Math.floor(Math.random() * 30), "day")
				.hour(Math.floor(Math.random() * 24))
				.minute(Math.floor(Math.random() * 60))
				.second(Math.floor(Math.random() * 60))
				.format("YYYY-MM-DD HH:mm:ss"),
		}
	})
}

const allEmptyHousesData = generateEmptyHousesData()

function RouteComponent() {
	const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>([
		dayjs().subtract(30, "day"),
		dayjs(),
	])

	// Фильтруем данные по выбранному периоду
	const filteredData = allEmptyHousesData.filter((house) => {
		if (!dateRange || !dateRange[0] || !dateRange[1]) {
			return true
		}

		const checkDate = dayjs(house.lastCheckDate)
		return (
			(checkDate.isAfter(dateRange[0], "day") || checkDate.isSame(dateRange[0], "day")) &&
			(checkDate.isBefore(dateRange[1], "day") || checkDate.isSame(dateRange[1], "day"))
		)
	})

	return (
		<>
			<PageHeader
				title={"Пустые дома"}
				breadcrumb={[
					{
						key: "/",
						title: <Link to={"/"}>Главная</Link>,
					},
					{
						key: "/empty-houses",
						title: "Пустые дома",
					},
				]}
				extra={
					<RangePicker
						value={dateRange}
						onChange={(dates) => setDateRange(dates as [Dayjs | null, Dayjs | null] | null)}
						format={"D MMMM YYYY"}
					/>
				}
			/>
			<Table
				dataSource={filteredData}
				columns={[
					{
						width: 100,
						title: "ID дома",
						dataIndex: "house_id",
						key: "house_id",
						render: (value) => `№${value}`,
					},
					{
						title: "Адрес",
						dataIndex: "address",
						key: "address",
					},
					{
						title: "Владелец дома",
						dataIndex: "owner",
						key: "owner",
					},
					{
						title: "Телефон",
						dataIndex: "phone",
						key: "phone",
					},
					{
						title: "Куда уехали",
						dataIndex: "destination",
						key: "destination",
					},
					{
						title: "Период отъезда",
						key: "period",
						render: (_: unknown, record: typeof filteredData[0]) => {
							const departure = dayjs(record.departureDate).format("D MMM YYYY")
							const returnDate = dayjs(record.returnDate).format("D MMM YYYY")
							return `${departure} - ${returnDate}`
						},
					},
					{
						title: "Статус дома",
						dataIndex: "statusLabel",
						key: "status",
						render: (label: string, record: typeof filteredData[0]) => (
							<Tag
								color={record.statusColor}
							>
								{label}
							</Tag>
						),
					},
					{
						title: "Дата последней проверки",
						dataIndex: "lastCheckDate",
						key: "lastCheckDate",
						render: (date: string) => dayjs(date).format("D MMMM YYYY, HH:mm:ss"),
						sorter: (a, b) => dayjs(a.lastCheckDate).unix() - dayjs(b.lastCheckDate).unix(),
					},
				]}
			/>
		</>
	)
}
