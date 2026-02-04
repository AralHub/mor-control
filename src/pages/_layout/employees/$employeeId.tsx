import { DeleteOutlined, EditOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons"
import { createFileRoute } from "@tanstack/react-router"
import { Card, Col, Flex, Row, Table, Tag, Typography } from "antd"
import { useEffect, useState } from "react"
import { blueColor, grayColor, greenColor, redColor, yellowColor } from "src/shared/ui"

const { Title, Text } = Typography

export const Route = createFileRoute("/_layout/employees/$employeeId")({
	component: RouteComponent,
})

type Point = {
	x: number
	y: number
	d: number
	color: string
}

const demoTrack: Point[] = [
	{ x: 5, y: 85, d: 1, color: greenColor },
	{ x: 5.5, y: 73.5, d: 2, color: greenColor },
	{ x: 7, y: 63, d: 3, color: greenColor },
	{ x: 7, y: 57, d: 4, color: yellowColor },
	{ x: 3.5, y: 57, d: 5, color: redColor },
	{ x: 4, y: 48, d: 6, color: greenColor },
	{ x: 7.5, y: 47, d: 7, color: grayColor },
	{ x: 9.5, y: 38, d: 8, color: grayColor },
	{ x: 5, y: 38, d: 9, color: grayColor },
	{ x: 10, y: 30, d: 10, color: redColor },
	{ x: 10, y: 23, d: 11, color: greenColor },
	{ x: 11, y: 16, d: 12, color: greenColor },
	{ x: 7, y: 16, d: 13, color: yellowColor },
	{ x: 6, y: 24, d: 14, color: greenColor },
]

type CheckedHouse = {
	key: number
	houseId: number
	address: string
	date: string
	time: string
	status: "green" | "red" | "yellow" | "gray"
}

const checkedHouses: CheckedHouse[] = Array.from({ length: 12 }).map((_, i) => {
	const statuses = ["green", "red", "yellow", "gray"] as const
	const status = statuses[Math.floor(Math.random() * statuses.length)]

	return {
		key: i + 1,
		houseId: i + 101,
		address: `ул. Амира Темура, дом ${i + 1}`,
		date: "2026-01-12",
		time: `${9 + (i % 8)}:${i % 2 === 0 ? "00" : "30"}`,
		status,
	}
})

function RouteComponent() {
	const [index, setIndex] = useState(0)

	useEffect(() => {
		const timer = setInterval(() => {
			setIndex((i) => (i + 1 < demoTrack.length ? i + 1 : i))
		}, 600)

		return () => clearInterval(timer)
	}, [])
	return (
		<>
			<Row gutter={[20, 20]}>
				<Col span={16}>
					<Flex
						vertical
						gap={20}
					>
						<Card
							variant={"outlined"}
							style={{
								overflow: "hidden",
								position: "relative",
								boxShadow: "none",
								padding: 5,
								borderColor: greenColor,
							}}
							styles={{
								body: {
									padding: 0,
								},
							}}
						>
							<div
								style={{
									width: "100%",
									height: "80vh",
									position: "relative",
									backgroundImage: "url(/assets/map/street-2.png)",
									backgroundSize: "cover",
									borderRadius: 12,
									overflow: "hidden",
								}}
							>
								{demoTrack.map((p, i) => (
									<div
										key={i}
										style={{
											position: "absolute",
											left: `${p.x}%`,
											top: `${p.y}%`,
											width: p.d ? 24 : 16,
											height: p.d ? 24 : 16,
											borderRadius: "50%",
											transform: "translate(-50%, -50%)",
											backgroundColor: p.color ?? blueColor,
											color: "white",
										}}
									>
										<Flex
											justify={"center"}
											align={"center"}
											style={{ paddingRight: 2, paddingTop: 1 }}
										>
											{p.d}
										</Flex>
									</div>
								))}

								<div
									style={{
										position: "absolute",
										left: `${demoTrack[index].x}%`,
										top: `${demoTrack[index].y}%`,
										width: 16,
										height: 16,
										borderRadius: "50%",
										backgroundColor: "red",
										transform: "translate(-50%, -50%)",
										transition: "all 0.5s linear",
										boxShadow: "0 0 6px rgba(0,0,0,0.3)",
										zIndex: 2,
									}}
								/>
							</div>
						</Card>
						<Card
							title="Проверенные дома инспектора"
							styles={{ body: { padding: 0 } }}
						>
							<Table
								size="small"
								dataSource={checkedHouses}
								columns={[
									{
										title: "ID",
										dataIndex: "houseId",
										key: "houseId",
										width: 70,
										render: (v) => `№${v}`,
									},
									{
										title: "Адрес",
										dataIndex: "address",
										key: "address",
									},
									{
										title: "Дата",
										dataIndex: "date",
										key: "date",
									},
									{
										title: "Время",
										dataIndex: "time",
										key: "time",
									},
									{
										title: "Статус",
										dataIndex: "status",
										key: "status",
										render: (status: CheckedHouse["status"]) =>
											status === "green" ? (
												<Tag color="green">Проверено</Tag>
											) : status === "red" ? (
												<Tag color="red">Не проверено</Tag>
											) : status === "yellow" ? (
												<Tag color="orange">Уведомлено</Tag>
											) : (
												<Tag color="default">Никого не было</Tag>
											),
									},
								]}
							/>
						</Card>
					</Flex>
				</Col>
				<Col span={8}>
					<Flex
						vertical={true}
						gap={20}
					>
						<Card>
							<Flex
								vertical={true}
								gap={20}
							>
								<Flex
									align={"center"}
									justify={"space-between"}
								>
									<Flex
										align={"center"}
										gap={10}
									>
										<div
											style={{
												width: 24,
												height: 24,
												borderRadius: "50%",
												backgroundColor: greenColor,
											}}
										/>
										- <Title level={5}>Проверенные дома</Title>
									</Flex>
									<Title level={5}>{demoTrack.filter((i) => i.color === greenColor).length}</Title>
								</Flex>
								<Flex
									align={"center"}
									justify={"space-between"}
								>
									<Flex
										align={"center"}
										gap={10}
									>
										<div
											style={{
												width: 24,
												height: 24,
												borderRadius: "50%",
												backgroundColor: redColor,
											}}
										/>
										- <Title level={5}>Не проверенные дома</Title>
									</Flex>
									<Title level={5}>{demoTrack.filter((i) => i.color === redColor).length}</Title>
								</Flex>
								<Flex
									align={"center"}
									justify={"space-between"}
								>
									<Flex
										align={"center"}
										gap={10}
									>
										<div
											style={{
												width: 24,
												height: 24,
												borderRadius: "50%",
												backgroundColor: yellowColor,
											}}
										/>
										- <Title level={5}>Уведомили владельца</Title>
									</Flex>
									<Title level={5}>{demoTrack.filter((i) => i.color === yellowColor).length}</Title>
								</Flex>
								<Flex
									align={"center"}
									justify={"space-between"}
								>
									<Flex
										align={"center"}
										gap={10}
									>
										<div
											style={{
												width: 24,
												height: 24,
												borderRadius: "50%",
												backgroundColor: grayColor,
											}}
										/>
										- <Title level={5}>Не было дома владельца</Title>
									</Flex>
									<Title level={5}>{demoTrack.filter((i) => i.color === grayColor).length}</Title>
								</Flex>
							</Flex>
						</Card>
						<Card
							actions={[
								<EditOutlined
									key="edit"
									style={{ fontSize: 25, color: blueColor }}
								/>,
								<SettingOutlined
									key="setting"
									style={{ fontSize: 25 }}
								/>,
								<DeleteOutlined
									key="delete"
									style={{ fontSize: 25, color: redColor }}
								/>,
							]}
						>
							<Flex
								vertical
								gap={20}
							>
								{/* Аватар */}
								<Flex justify="center">
									<UserOutlined style={{ fontSize: 100 }} />
								</Flex>

								{/* Основная информация */}
								<Flex
									justify="space-between"
									align="center"
								>
									<Text
										type="secondary"
										strong
									>
										ФИО:
									</Text>
									<Title level={5}>Palensheev T.</Title>
								</Flex>

								<Flex
									justify="space-between"
									align="center"
								>
									<Text
										type="secondary"
										strong
									>
										Пол:
									</Text>
									<Title level={5}>Мужчина</Title>
								</Flex>

								<Flex
									justify="space-between"
									align="center"
								>
									<Text
										type="secondary"
										strong
									>
										Дата рождения:
									</Text>
									<Title level={5}>29 февраля 1994</Title>
								</Flex>

								<Flex
									justify="space-between"
									align="center"
								>
									<Text
										type="secondary"
										strong
									>
										Телефон:
									</Text>
									<Title level={5}>+998 90 322-33-32</Title>
								</Flex>

								<Flex
									justify="space-between"
									align="center"
								>
									<Text
										type="secondary"
										strong
									>
										Должность:
									</Text>
									<Title level={5}>Инспектор</Title>
								</Flex>

								<Flex
									justify="space-between"
									align="center"
								>
									<Text
										type="secondary"
										strong
									>
										Компания:
									</Text>
									<Title level={5}>Компания 3</Title>
								</Flex>

								{/* Образование */}
								<Flex
									justify="space-between"
									align="center"
								>
									<Text
										type="secondary"
										strong
									>
										Образование:
									</Text>
									<Title level={5}>Высшее</Title>
								</Flex>

								<Flex
									justify="space-between"
									align="center"
								>
									<Text
										type="secondary"
										strong
									>
										Диплом:
									</Text>
									<Text type="success">В наличии</Text>
								</Flex>

								<Flex
									justify="space-between"
									align="center"
								>
									<Text
										type="secondary"
										strong
									>
										Специальность:
									</Text>
									<Title level={5}>Инженер-строитель</Title>
								</Flex>

								{/* Профессиональные данные */}
								<Flex
									justify="space-between"
									align="center"
								>
									<Text
										type="secondary"
										strong
									>
										Стаж:
									</Text>
									<Title level={5}>6 лет</Title>
								</Flex>

								<Flex
									justify="space-between"
									align="center"
								>
									<Text
										type="secondary"
										strong
									>
										Сертификат инспектора:
									</Text>
									<Text type="success">Действителен</Text>
								</Flex>

								<Flex
									justify="space-between"
									align="center"
								>
									<Text
										type="secondary"
										strong
									>
										Статус:
									</Text>
									<Text type="success">Активен</Text>
								</Flex>

								{/* Финансы */}
								<Flex
									justify="space-between"
									align="center"
								>
									<Text
										type="secondary"
										strong
									>
										Оклад:
									</Text>
									<Title level={5}>3 500 000 сум</Title>
								</Flex>

								<Flex
									justify="space-between"
									align="center"
								>
									<Text
										type="secondary"
										strong
									>
										Бонус за проверки:
									</Text>
									<Title level={5}>1 250 000 сум</Title>
								</Flex>

								<Flex
									justify="space-between"
									align="center"
								>
									<Text
										type="secondary"
										strong
									>
										Доход за месяц:
									</Text>
									<Title
										level={5}
										style={{ color: "green" }}
									>
										4 750 000 сум
									</Title>
								</Flex>
							</Flex>
						</Card>
					</Flex>
				</Col>
			</Row>
		</>
	)
}
