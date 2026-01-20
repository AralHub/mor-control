import { createFileRoute, Link } from "@tanstack/react-router"
import { DatePicker, Table, Tag } from "antd"
import dayjs, { type Dayjs } from "dayjs"
import { useState } from "react"
import { PageHeader } from "src/widgets/shared"

const { RangePicker } = DatePicker

export const Route = createFileRoute("/_layout/checked-houses")({
	component: RouteComponent,
})

// Генерируем данные о проверенных домах
const generateHousesData = () => {
	return Array.from({ length: 25 }, (_, index) => ({
		key: index + 1,
		house_id: index + 1,
		address: `Улица ${index + 1}, дом ${index + 1}`,
		checks: Array.from({ length: Math.floor(Math.random() * 10) + 1 }, (_, i) => ({
			date: dayjs()
				.subtract(Math.floor(Math.random() * 30), "day")
				.hour(Math.floor(Math.random() * 24))
				.minute(Math.floor(Math.random() * 60))
				.second(Math.floor(Math.random() * 60))
				.format("YYYY-MM-DD HH:mm:ss"),
			inspector: `Инспектор ${String.fromCharCode(65 + (i % 5))}`,
		})),
	}))
}

const allHousesData = generateHousesData()

function RouteComponent() {
	const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>([
		dayjs().subtract(30, "day"),
		dayjs(),
	])

	// Фильтруем данные по выбранному периоду
	const filteredData = allHousesData.map((house) => {
		// Находим дату последней проверки
		const lastCheckDate = house.checks.length > 0
			? house.checks.reduce((latest, check) => {
					const checkDate = dayjs(check.date)
					const latestDate = dayjs(latest.date)
					return checkDate.isAfter(latestDate) ? check : latest
				}, house.checks[0]).date
			: null

		if (!dateRange || !dateRange[0] || !dateRange[1]) {
			return {
				...house,
				checkedCount: house.checks.length,
				lastCheckDate,
			}
		}

		const checkedInPeriod = house.checks.filter((check) => {
			const checkDate = dayjs(check.date)
			return (
				checkDate.isAfter(dateRange[0], "day") || checkDate.isSame(dateRange[0], "day")
			) && (checkDate.isBefore(dateRange[1], "day") || checkDate.isSame(dateRange[1], "day"))
		})

		return {
			...house,
			checkedCount: checkedInPeriod.length,
			lastCheckDate,
		}
	})

	return (
		<>
			<PageHeader
				title={"Проверенные дома"}
				breadcrumb={[
					{
						key: "/",
						title: <Link to={"/"}>Главная</Link>,
					},
					{
						key: "/checked-houses",
						title: "Проверенные дома",
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
						title: "Количество проверенных за период",
						dataIndex: "checkedCount",
						key: "checkedCount",
						render: (value: number) => (
							<Tag
								color={"green"}
							>
								{value || 0}
							</Tag>
						),
						sorter: (a, b) => a.checkedCount - b.checkedCount,
					},
					{
						title: "Дата последней проверки",
						dataIndex: "lastCheckDate",
						key: "lastCheckDate",
						render: (date: string | null) => date ? dayjs(date).format("D MMMM YYYY, HH:mm:ss") : "-",
						sorter: (a, b) => {
							if (!a.lastCheckDate) return 1
							if (!b.lastCheckDate) return -1
							return dayjs(a.lastCheckDate).unix() - dayjs(b.lastCheckDate).unix()
						},
					},
				]}
			/>
		</>
	)
}
