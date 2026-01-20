import {
	CheckCircleOutlined,
	ClockCircleOutlined,
	CloseCircleOutlined,
	QuestionCircleOutlined,
	SyncOutlined,
	UserOutlined,
} from "@ant-design/icons"
import { createFileRoute } from "@tanstack/react-router"
import { Button, Card, Checkbox, Col, DatePicker, Flex, Modal, Row, Table } from "antd"
import dayjs from "dayjs"
import { useState } from "react"
import { Map, StatisticCard, type StatisticCardType } from "src/shared/ui"
import { PageHeader } from "src/widgets/shared"

export const Route = createFileRoute("/_layout/")({
	component: RouteComponent,
})

const cardItems: StatisticCardType[] = [
	{
		color: "rgb(15, 98, 106)",
		Icon: CheckCircleOutlined,
		text: "view port",
		title: "Проверено",
		value: "213",
	},
	{
		color: "rgb(191, 163, 72)",
		Icon: ClockCircleOutlined,
		text: "view port",
		title: "Уведомлено",
		value: "23",
	},
	{
		color: "rgb(156, 61, 61)",
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
		check_id: index + 1,
		date: `2026-01-0${1 + index}`,
		inspector: "Palensheev T.",
	}))
	.reverse()

function RouteComponent() {
	const [selected, setSelected] = useState<number | null>(null)
	const [isGreen, setIsGreen] = useState(true)
	const [isRed, setIsRed] = useState(true)
	const [isGray, setIsGray] = useState(true)
	const [isYellow, setIsYellow] = useState(true)

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
							{cardItems.map((item) => (
								<Col
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
					</Flex>
				</Col>
				<Col
					xs={24}
					md={16}
				>
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
				</Col>
			</Row>
		</>
	)
}
