import {
	CheckCircleOutlined,
	ClockCircleOutlined,
	CloseCircleOutlined,
	QuestionCircleOutlined,
	SyncOutlined,
	UserOutlined,
} from "@ant-design/icons"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { Button, Card, Checkbox, Col, DatePicker, Flex, Modal, Row, Table, Tag } from "antd"
import dayjs from "dayjs"
import { useState } from "react"
import Chart from "react-apexcharts"
import { DESIGN_TOKEN } from "src/shared/constants"
import { Map, redColor, StatisticCard, yellowColor, type StatisticCardType } from "src/shared/ui"
import { PageHeader } from "src/widgets/shared"

export const Route = createFileRoute("/_layout/")({
	component: RouteComponent,
})

const cardItems: StatisticCardType[] = [
	{
		color: "rgb(32, 163, 158)",
		Icon: CheckCircleOutlined,
		text: "view port",
		title: "Проверено",
		value: "213",
	},
	{
		color: DESIGN_TOKEN.colorWarning,
		Icon: ClockCircleOutlined,
		text: "view port",
		title: "Уведомлено",
		value: "23",
	},
	{
		color: DESIGN_TOKEN.colorError,
		Icon: CloseCircleOutlined,
		text: "view port",
		title: "Не проверено",
		value: "42",
	},
	{
		color: "rgb(120, 130, 132)",
		Icon: QuestionCircleOutlined,
		text: "view port",
		title: "Дома никого",
		value: "12",
	},
]

const modalData = Array.from({ length: 4 })
	.map((_v, index) => ({
		key: index + 1,
		check_id: index + 1,
		date: `2026-01-0${1 + index}`,
		inspector: "Palensheev T.",
	}))
	.reverse()

const latestChecklists = Array.from({ length: 10 })
	.map((_v, index) => ({
		key: index + 1,
		check_id: index + 1,
		house: index + 1,
		status: index % 5 === 0 ? "red" : index % 7 === 0 ? "orange" : "green",
		date: `2026-01-0${1 + index}`,
		inspector: "Palensheev Tolenshe",
	}))
	.reverse()

// Генерируем данные за месяц (30 дней)
const generateMonthlyData = () => {
	const days = Array.from({ length: 30 }, (_, i) => {
		const date = dayjs().subtract(29 - i, "day")
		return date.format("D MMM")
	})

	const checked = Array.from({ length: 30 }, () => Math.floor(Math.random() * 50) + 150)
	const notChecked = Array.from({ length: 30 }, () => Math.floor(Math.random() * 30) + 20)
	const empty = Array.from({ length: 30 }, () => Math.floor(Math.random() * 15) + 5)
	const notified = Array.from({ length: 30 }, () => Math.floor(Math.random() * 25) + 10)

	return { days, checked, notChecked, empty, notified }
}

const monthlyData = generateMonthlyData()

function RouteComponent() {
	const [selected, setSelected] = useState<number | null>(null)
	const [isGreen, setIsGreen] = useState(true)
	const [isRed, setIsRed] = useState(true)
	const [isGray, setIsGray] = useState(true)
	const [isYellow, setIsYellow] = useState(true)

	const navigate = useNavigate()

	return (
		<>
			<Modal
				centered={true}
				open={!!selected}
				onCancel={() => {
					setSelected(null)
				}}
				title={`House: №${selected}`}
			>
				<Table
					dataSource={modalData}
					onRow={() => ({
						style: {
							cursor: "pointer",
						},
						onClick: () => navigate({
							to: "/employees/$employeeId",
							params: {
								employeeId: `${selected}`,
							},
						}),
					})}
					columns={[
						{
							title: "Чек ID",
							dataIndex: "check_id",
							key: "check_id",
							render: (value) => `№${value}`,
						},
						{
							title: "Дата",
							dataIndex: "date",
							key: "date",
						},
						{
							title: "Инспектор",
							dataIndex: "inspector",
							key: "inspector",
						},
						{
							title: "Фото",
							dataIndex: "image",
							key: "image",
							render: () => <UserOutlined style={{ fontSize: 50 }} />,
						},
					]}
				/>
			</Modal>
			<PageHeader
				title={"Главная"}
				breadcrumb={[
					{
						key: "/",
						title: "Главная",
					},
				]}
				extra={[
					<DatePicker
						defaultValue={dayjs()}
						key={"date"}
						format={"D MMMM YYYY"}
					/>,
					<Button
						type={"primary"}
						key={"sync"}
						icon={<SyncOutlined />}
						children={"Sync"}
					/>,
				]}
			/>
			<Row gutter={[20, 20]}>
				<Col
					xs={24}
					md={8}
				>
					<Flex
						vertical={true}
						gap={24}
					>
						<Row gutter={[20, 20]}>
							{cardItems.map((item, index) => (
								<Col
									key={index}
									xs={24}
									sm={12}
								>
									<StatisticCard
										Icon={item.Icon}
										color={item.color}
										text={item.text}
										title={item.title}
										value={item.value}
									/>
								</Col>
							))}
						</Row>
						<Card title={"Последние проверочные листы"} styles={{ body: { padding: 0 } }}>
							<Table
								style={{
									borderRadius: 0,
								}}
								onRow={() => ({
									style: {
										cursor: "pointer",
									},
									onClick: () => navigate({
										to: "/employees/$employeeId",
										params: {
											employeeId: `${selected}`,
										},
									}),
								})}
								dataSource={latestChecklists}
								pagination={false}
								size={"small"}
								columns={[
									{
										width: 60,
										title: "ID",
										dataIndex: "check_id",
										key: "check_id",
										render: (value) => `№${value}`,
									},
									{
										title: "Дом",
										dataIndex: "house",
										key: "house",
										render: (value) => `Дом №${value}`,
									},
									{
										title: "Статус",
										dataIndex: "status",
										key: "status",
										render: (status: "green" | "red" | "orange") =>
											status === "red" ? (
												<Tag
													color={"red"}
													variant={"solid"}
												>
													Не проверено
												</Tag>
											) : status === "orange" ? (
												<Tag
													color={"orange"}
													variant={"solid"}
												>
													Уведомлено
												</Tag>
											) : (
												<Tag
													color={"green"}
													variant={"solid"}
												>
													Проверено
												</Tag>
											),
									},
									{
										title: "Дата",
										dataIndex: "date",
										key: "date",
									},
									{
										title: "Инспектор",
										dataIndex: "inspector",
										key: "inspector",
									},
								]}
							/>
						</Card>
					</Flex>
				</Col>
				<Col
					xs={24}
					md={16}
				>
					<Flex vertical={true} gap={20}>
						<Card variant={"borderless"}>
							<Flex gap={20}>
								<Map
									isGray={isGray}
									isGreen={isGreen}
									isRed={isRed}
									isYellow={isYellow}
									setSelected={setSelected}
								/>
								<Flex
									vertical={true}
									gap={20}
								>
									<Checkbox
										checked={isGreen}
										onChange={(e) => setIsGreen(e?.target?.checked)}
									>
										зеленый - проверенные дома
									</Checkbox>
									<Checkbox
										checked={isRed}
										onChange={(e) => setIsRed(e?.target?.checked)}
									>
										красный - не проверенные дома
									</Checkbox>
									<Checkbox
										checked={isGray}
										onChange={(e) => setIsGray(e?.target?.checked)}
									>
										серый - не было дома владельца
									</Checkbox>
									<Checkbox
										checked={isYellow}
										onChange={(e) => setIsYellow(e?.target?.checked)}
									>
										желтый - уведомили владельца
									</Checkbox>
								</Flex>
							</Flex>
						</Card>
						<Card title={"Статистика за месяц"} styles={{ body: { padding: 0 } }}>
							<Chart
								type={"line"}
								height={350}
								series={[
									{
										name: "Проверено",
										data: monthlyData.checked,
										color: "rgb(32, 163, 158)",
									},
									{
										name: "Не проверено",
										data: monthlyData.notChecked,
										color: redColor,
									},
									{
										name: "Дома никого",
										data: monthlyData.empty,
										color: "rgb(120, 130, 132)",
									},
									{
										name: "Уведомлено",
										data: monthlyData.notified,
										color: yellowColor,
									},
								]}
								options={{
									chart: {
										height: 350,
										type: "line",
										zoom: {
											enabled: false,
										},
										toolbar: {
											show: false,
										},
									},
									dataLabels: {
										enabled: false,
									},
									stroke: {
										curve: "smooth",
										width: 2,
									},
									xaxis: {
										categories: monthlyData.days,
										labels: {
											rotate: -45,
											rotateAlways: false,
										},
									},
									yaxis: {
										title: {
											text: "Количество",
										},
									},
									legend: {
										position: "top",
										horizontalAlign: "right",
									},
									grid: {
										borderColor: "#e7e7e7",
										row: {
											colors: ["#f3f3f3", "transparent"],
											opacity: 0.5,
										},
									},
								}}
							/>
						</Card>
					</Flex>
				</Col>
			</Row>
		</>
	)
}
