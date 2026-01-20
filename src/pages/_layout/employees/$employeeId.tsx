import { DeleteOutlined, EditOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons"
import { createFileRoute } from "@tanstack/react-router"
import { Card, Col, Flex, Row, Typography } from "antd"
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
									key={"edit"}
									style={{ fontSize: 25, color: blueColor }}
								/>,
								<SettingOutlined
									key={"setting"}
									style={{ fontSize: 25 }}
								/>,
								<DeleteOutlined
									key={"ellipsis"}
									style={{ fontSize: 25, color: redColor }}
								/>,
							]}
						>
							<Flex
								vertical={true}
								gap={20}
							>
								<Flex justify={"center"}>
									<UserOutlined style={{ fontSize: 100 }} />
								</Flex>
								<Flex
									justify={"space-between"}
									align={"center"}
								>
									<Text
										type={"secondary"}
										strong={true}
									>
										ФИО:
									</Text>
									<Title level={5}>Palensheev T.</Title>
								</Flex>
								<Flex
									justify={"space-between"}
									align={"center"}
								>
									<Text
										type={"secondary"}
										strong={true}
									>
										Пол:
									</Text>
									<Title level={5}>Мужчина</Title>
								</Flex>
								<Flex
									justify={"space-between"}
									align={"center"}
								>
									<Text
										type={"secondary"}
										strong={true}
									>
										Дата рождения:
									</Text>
									<Title level={5}>29-февраль 1994 г.</Title>
								</Flex>
								<Flex
									justify={"space-between"}
									align={"center"}
								>
									<Text
										type={"secondary"}
										strong={true}
									>
										Телефон:
									</Text>
									<Title level={5}>+998 90 322-33-32</Title>
								</Flex>
								<Flex
									justify={"space-between"}
									align={"center"}
								>
									<Text
										type={"secondary"}
										strong={true}
									>
										Должность:
									</Text>
									<Title level={5}>Инспектор</Title>
								</Flex>
							</Flex>
						</Card>
					</Flex>
				</Col>
			</Row>
		</>
	)
}
