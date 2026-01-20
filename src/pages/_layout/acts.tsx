import { PlusOutlined, EnvironmentOutlined, DeleteOutlined } from "@ant-design/icons"
import { createFileRoute, Link } from "@tanstack/react-router"
import { Button, Checkbox, Flex, Form, Input, Modal, Space, Table, Tag, type ModalProps } from "antd"
import dayjs from "dayjs"
import { useState, type FC } from "react"
import { PageHeader } from "src/widgets/shared"

const { TextArea } = Input

export const Route = createFileRoute("/_layout/acts")({
	component: RouteComponent,
})

const actReasons = [
	"Нужно прочистить трубу котла",
	"Газ подсоединен с помощью шланга",
	"Есть протечка газа",
	"Газ плита подключена неправильно",
	"Отсутствует газовый счетчик",
	"Неисправен газовый счетчик",
	"Нарушена герметичность газопровода",
	"Отсутствует вентиляция в помещении с газовым оборудованием",
	"Газовое оборудование установлено в неподходящем месте",
	"Истек срок эксплуатации газового оборудования",
	"Отсутствует техническая документация на газовое оборудование",
]

const firstNames = ["Айдар", "Бахыт", "Данияр", "Ерлан", "Жанар", "Канат", "Марат", "Нурлан", "Олжас", "Серик"]
const lastNames = ["Алиев", "Беков", "Даулетов", "Ермеков", "Жумабеков", "Касымов", "Муканов", "Нургалиев", "Омаров", "Сейтов"]
const middleNames = ["Абдуллаевич", "Бахытжанович", "Даниярович", "Ерланович", "Жанарович", "Канатович", "Маратович", "Нурланович", "Олжасович", "Серикович"]

const positions = [
	"Инспектор газовой службы",
	"Старший инспектор",
	"Главный инспектор",
	"Специалист по газовому оборудованию",
	"Технический инспектор",
]

// Генерируем данные об актах
const generateActsData = () => {
	return Array.from({ length: 20 }, (_, index) => {
		const ownerFirstName = firstNames[Math.floor(Math.random() * firstNames.length)]
		const ownerLastName = lastNames[Math.floor(Math.random() * lastNames.length)]
		const ownerMiddleName = middleNames[Math.floor(Math.random() * middleNames.length)]
		const operatorCodes = [90, 91, 93, 94, 95, 97, 98, 99]
		const operatorCode = operatorCodes[Math.floor(Math.random() * operatorCodes.length)]
		const phoneNumber = `+998 ${operatorCode} ${100 + Math.floor(Math.random() * 900)} ${10 + Math.floor(Math.random() * 90)} ${10 + Math.floor(Math.random() * 90)}`

		// Генерируем 2-4 лица, подписывающих акт
		const signersCount = Math.floor(Math.random() * 3) + 2
		const signers = Array.from({ length: signersCount }, () => {
			const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
			const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
			const middleName = middleNames[Math.floor(Math.random() * middleNames.length)]
			const position = positions[Math.floor(Math.random() * positions.length)]
			const hasSignature = Math.random() > 0.3 // 70% имеют подпись

			return {
				fullName: `${lastName} ${firstName} ${middleName}`,
				position,
				hasSignature,
			}
		})

		return {
			key: index + 1,
			act_id: index + 1,
			reason: actReasons[Math.floor(Math.random() * actReasons.length)],
			ownerPhone: phoneNumber,
			ownerFullName: `${ownerLastName} ${ownerFirstName} ${ownerMiddleName}`,
			signers,
			date: dayjs()
				.subtract(Math.floor(Math.random() * 60), "day")
				.format("YYYY-MM-DD"),
		}
	})
}

const actsData = generateActsData()

function RouteComponent() {
	const [isModalOpen, setIsModalOpen] = useState(false)

	const handleOpenModal = () => {
		setIsModalOpen(true)
	}

	const handleCloseModal = () => {
		setIsModalOpen(false)
	}

	// const handleGetLocation = () => {
	// 	if (navigator.geolocation) {
	// 		navigator.geolocation.getCurrentPosition(
	// 			(position) => {
	// 				const { latitude, longitude } = position.coords
	// 				form.setFieldsValue({
	// 					location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
	// 				})
	// 			},
	// 			(error) => {
	// 				console.error("Error getting location:", error)
	// 			}
	// 		)
	// 	} else {
	// 		console.error("Geolocation is not supported by this browser.")
	// 	}
	// }

	return (
		<>
			<PageHeader
				title={"Акты"}
				breadcrumb={[
					{
						key: "/",
						title: <Link to={"/"}>Главная</Link>,
					},
					{
						key: "/acts",
						title: "Акты",
					},
				]}
				extra={
					<Button
						type={"primary"}
						icon={<PlusOutlined />}
						onClick={handleOpenModal}
					>
						Добавить акт
					</Button>
				}
			/>
			<Table
				dataSource={actsData}
				columns={[
					{
						width: 100,
						title: "ID акта",
						dataIndex: "act_id",
						key: "act_id",
						render: (value) => `№${value}`,
					},
					{
						title: "Причина составления акта",
						dataIndex: "reason",
						key: "reason",
						width: 300,
					},
					{
						title: "ФИО домовладельца",
						dataIndex: "ownerFullName",
						key: "ownerFullName",
					},
					{
						title: "Телефон домовладельца",
						dataIndex: "ownerPhone",
						key: "ownerPhone",
					},
					{
						title: "Лица, подписывающие акт",
						dataIndex: "signers",
						key: "signers",
						width: 400,
						render: (signers: typeof actsData[0]["signers"]) => (
							<div>
								{signers.map((signer, idx) => (
									<div
										key={idx}
										style={{ marginBottom: idx < signers.length - 1 ? 8 : 0 }}
									>
										<div>
											<strong>{signer.fullName}</strong>
										</div>
										<div style={{ fontSize: "12px", color: "#666" }}>
											{signer.position}
										</div>
										<div style={{ marginTop: 4 }}>
											{signer.hasSignature ? (
												<Tag
													color={"green"}
												>
													Подпись есть
												</Tag>
											) : (
												<Tag
													color={"red"}
												>
													Подпись отсутствует
												</Tag>
											)}
										</div>
									</div>
								))}
							</div>
						),
					},
					{
						title: "Дата",
						dataIndex: "date",
						key: "date",
						render: (date: string) => dayjs(date).format("D MMMM YYYY"),
						sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
					},
				]}
			/>

			<FormModal
				open={isModalOpen}
				onCancel={handleCloseModal}
			/>
		</>
	)
}


const FormModal: FC<ModalProps> = (props) => {

	const [form] = Form.useForm()



	const handleCloseModal = () => {
		form.resetFields()
	}

	const handleFinish = (values: unknown) => {
		console.log("Form values:", values)
		// Здесь будет логика сохранения акта
		handleCloseModal()
	}

	return (
		<Modal
			title={"Добавить новый акт"}
			footer={null}
			width={800}
			forceRender={true}
			{...props}
			onCancel={(e) => {
				handleCloseModal()
				props?.onCancel?.(e)
			}}
		>
			<Form
				form={form}
				layout={"vertical"}
				onFinish={handleFinish}
			>
				<Form.Item
					label={"Причина составления акта"}
					name={"reason"}
					rules={[{ required: true, message: "Пожалуйста, укажите причину составления акта" }]}
				>
					<TextArea
						rows={4}
						placeholder={"Введите причину составления акта..."}
					/>
				</Form.Item>

				<Form.Item
					label={"ФИО домовладельца"}
					name={"ownerFullName"}
					rules={[{ required: true, message: "Пожалуйста, укажите ФИО домовладельца" }]}
				>
					<Input placeholder={"Введите ФИО домовладельца"} />
				</Form.Item>

				<Form.Item
					label={"Телефон домовладельца"}
					name={"ownerPhone"}
					rules={[
						{ required: true, message: "Пожалуйста, укажите телефон домовладельца" },
						// { pattern: /^\+?[0-9\s\-()]+$/, message: "Введите корректный номер телефона" },
					]}
				>
					<Input placeholder={"+998 XX XXX XX XX"} />
				</Form.Item>

				<Form.Item
					label={"Локация"}
					name={"location"}
					rules={[{ required: false, message: "Пожалуйста, определите локацию" }]}
				>
					<Space.Compact style={{ width: "100%" }}>
						<Input
							placeholder={"Координаты или адрес"}
						/>
						<Button
							icon={<EnvironmentOutlined />}
						// onClick={handleGetLocation}
						>
							Определить локацию
						</Button>
					</Space.Compact>
				</Form.Item>

				<Form.List
					name={"signers"}
					initialValue={[{}]}
				>
					{(fields, { add, remove }, { errors }) => (
						<>
							<div style={{ marginBottom: 8 }}>
								<strong>Лица, подписывающие акт</strong>
							</div>
							{fields.map((field, index) => (
								<div
									key={field.name}
									style={{
										border: "1px solid #d9d9d9",
										borderRadius: 4,
										padding: 16,
										marginBottom: 16,
										position: "relative",
									}}
								>
									{fields.length > 1 && (
										<Button
											type={"text"}
											danger={true}
											icon={<DeleteOutlined />}
											onClick={() => remove(field.name)}
											style={{
												position: "absolute",
												right: 8,
												top: 8,
											}}
										>
											Удалить
										</Button>
									)}
									<Form.Item
										{...field}
										label={`Лицо ${index + 1}`}
										name={[field.name, "fullName"]}
										rules={[{ required: true, message: "Введите ФИО" }]}
									>
										<Input placeholder={"ФИО"} />
									</Form.Item>
									<Form.Item
										{...field}
										name={[field.name, "position"]}
										rules={[{ required: true, message: "Введите должность" }]}
									>
										<Input placeholder={"Должность"} />
									</Form.Item>
									<Form.Item
										{...field}
										name={[field.name, "hasSignature"]}
										valuePropName={"checked"}
										initialValue={false}
									>
										<Checkbox>Подпись есть</Checkbox>
									</Form.Item>
								</div>
							))}
							<Form.ErrorList errors={errors} />
							<Button
								type={"dashed"}
								onClick={() => add()}
								block={true}
								icon={<PlusOutlined />}
								style={{ marginBottom: 16 }}
							>
								Добавить нового владельца подписи
							</Button>
						</>
					)}
				</Form.List>

				<Form.Item>
					<Flex justify={"end"} gap={8}>
						<Button
							type={"primary"}
							htmlType={"submit"}
						>
							Сохранить
						</Button>
						<Button onClick={handleCloseModal}>
							Отмена
						</Button>
					</Flex>
				</Form.Item>
			</Form>
		</Modal>

	)
}