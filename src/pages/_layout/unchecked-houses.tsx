import { createFileRoute, Link } from "@tanstack/react-router"
import { DatePicker, Table, Tag } from "antd"
import dayjs, { type Dayjs } from "dayjs"
import { useState } from "react"
import { PageHeader } from "src/widgets/shared"

const { RangePicker } = DatePicker

export const Route = createFileRoute("/_layout/unchecked-houses")({
	component: RouteComponent,
})

const reasons = [
	"Владелец не был дома",
	"Отказался от проверки",
	"Не удалось связаться",
	"Дом закрыт",
	"Перенесено на другой день",
]

const firstNames = ["Айдар", "Бахыт", "Данияр", "Ерлан", "Жанар", "Канат", "Марат", "Нурлан", "Олжас", "Серик"]
const lastNames = ["Алиев", "Беков", "Даулетов", "Ермеков", "Жумабеков", "Касымов", "Муканов", "Нургалиев", "Омаров", "Сейтов"]

// Генерируем данные о непроверенных домах
const generateUncheckedHousesData = () => {
	return Array.from({ length: 25 }, (_, index) => {
		const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
		const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
		const operatorCodes = [90, 91, 93, 94, 95, 97, 98, 99]
		const operatorCode = operatorCodes[Math.floor(Math.random() * operatorCodes.length)]
		const phoneNumber = `+998 ${operatorCode} ${100 + Math.floor(Math.random() * 900)} ${10 + Math.floor(Math.random() * 90)} ${10 + Math.floor(Math.random() * 90)}`
		
		return {
			key: index + 1,
			house_id: index + 1,
			address: `Улица ${index + 1}, дом ${index + 1}`,
			owner: `${firstName} ${lastName}`,
			phone: phoneNumber,
			reason: reasons[Math.floor(Math.random() * reasons.length)],
			lastAttemptDate: dayjs()
				.subtract(Math.floor(Math.random() * 30), "day")
				.hour(Math.floor(Math.random() * 24))
				.minute(Math.floor(Math.random() * 60))
				.second(Math.floor(Math.random() * 60))
				.format("YYYY-MM-DD HH:mm:ss"),
		}
	})
}

const allUncheckedHousesData = generateUncheckedHousesData()

function RouteComponent() {
	const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>([
		dayjs().subtract(30, "day"),
		dayjs(),
	])

	// Фильтруем данные по выбранному периоду
	const filteredData = allUncheckedHousesData.filter((house) => {
		if (!dateRange || !dateRange[0] || !dateRange[1]) {
			return true
		}

		const attemptDate = dayjs(house.lastAttemptDate)
		return (
			(attemptDate.isAfter(dateRange[0], "day") || attemptDate.isSame(dateRange[0], "day")) &&
			(attemptDate.isBefore(dateRange[1], "day") || attemptDate.isSame(dateRange[1], "day"))
		)
	})

	return (
		<>
			<PageHeader
				title={"Непроверенные дома"}
				breadcrumb={[
					{
						key: "/",
						title: <Link to={"/"}>Главная</Link>,
					},
					{
						key: "/unchecked-houses",
						title: "Непроверенные дома",
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
						title: "Причина непроверки",
						dataIndex: "reason",
						key: "reason",
						render: (reason: string) => (
							<Tag
								color={"red"}
							>
								{reason}
							</Tag>
						),
					},
					{
						title: "Дата последней попытки",
						dataIndex: "lastAttemptDate",
						key: "lastAttemptDate",
						render: (date: string) => dayjs(date).format("D MMMM YYYY, HH:mm:ss"),
						sorter: (a, b) => dayjs(a.lastAttemptDate).unix() - dayjs(b.lastAttemptDate).unix(),
					},
				]}
			/>
		</>
	)
}
