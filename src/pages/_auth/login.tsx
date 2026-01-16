import { createFileRoute, useNavigate } from "@tanstack/react-router"
import {
	Button,
	Card,
	Checkbox,
	Col,
	ConfigProvider,
	Flex,
	Form,
	type FormProps,
	Image,
	Input,
	InputNumber,
	Row,
	theme,
	Typography,
} from "antd"
import { css, cx } from "antd-style"

export const Route = createFileRoute("/_auth/login")({
	component: RouteComponent,
})

function RouteComponent() {
	const { token } = theme.useToken()
	const [form] = Form.useForm()

	const navigate = useNavigate()

	const onFinish: FormProps["onFinish"] = () => {
		navigate({
			to: "/",
			replace: true,
		})
	}
	return (
		<>
			<Card
				style={{
					maxWidth: token.screenXXL,
					width: "100%",
					aspectRatio: 14 / 6,
				}}
				styles={{
					root: {
						backgroundImage: "url(/assets/auth/login-bg.png)",
						backgroundPosition: "center",
						backgroundSize: "cover",
					},
				}}
			>
				<Row gutter={token.paddingLG}>
					<Col
						xs={24}
						lg={14}
					>
						<Typography.Title
							style={{
								textTransform: "uppercase",
								marginTop: token.marginLG,
								textAlign: "center",
								fontWeight: 700,
							}}
						>
							<Typography.Text
								strong={true}
								style={{ fontSize: "inherit", color: token.colorPrimary }}
							>
								MOR
							</Typography.Text>
							-Admin
						</Typography.Title>
						<Flex justify={"center"}>
							<Image
								preview={false}
								src={"/assets/auth/auth-phone.png"}
								fallback={"/assets/auth/auth-phone.png"}
								style={{
									margin: "0 auto",
								}}
							/>
						</Flex>
					</Col>
					<Col
						xs={24}
						lg={10}
					>
						<Flex
							style={{ height: "100%" }}
							justify={"center"}
							vertical={true}
						>
							<Form
								name={"login-form"}
								form={form}
								onFinish={onFinish}
								requiredMark={false}
								autoCapitalize={"off"}
								layout={"vertical"}
								labelCol={{
									style: {
										display: "none",
									},
								}}
								style={{ paddingInline: token.paddingLG }}
							>
								<div
									style={{
										marginBottom: token.marginLG * 2,
									}}
								>
									<Typography.Title>
										<span style={{ color: token.colorWhite }}>Welcome To</span> MOR-Admin!
									</Typography.Title>
									<Typography.Paragraph
										style={{
											margin: `${token.marginSM}px 0 ${token.marginXS}px`,
											color: "rgba(255, 255, 255, 0.8)",
											fontSize: token.fontSizeLG,
											fontWeight: 500,
										}}
									>
										Sign in with your data that you enter during your registration
									</Typography.Paragraph>
								</div>
								<Form.Item
									name={"phone_number"}
									label={"Phone number"}
									rules={[{ required: true }]}
								>
									<InputNumber
										controls={false}
										keyboard={false}
										stringMode={true}
										prefix={"+"}
										style={{
											width: "100%",
											height: 52,
											backgroundColor: "rgba(255, 255, 255, 0.4)",
										}}
										placeholder={"998 90 123 45 67"}
									/>
								</Form.Item>
								<Form.Item
									name={"password"}
									label={"Password"}
									rules={[{ required: true }]}
								>
									<Input.Password
										style={{
											width: "100%",
											height: 52,
											backgroundColor: "rgba(255, 255, 255, 0.4)",
										}}
										placeholder={"*********"}
									/>
								</Form.Item>
								<Form.Item
									name={"remember"}
									initialValue={false}
									valuePropName={"checked"}
								>
									<ConfigProvider
										theme={{
											token: {
												controlInteractiveSize: 24,
											},
										}}
									>
										<Checkbox
											style={{
												fontSize: token.fontSizeLG,
												color: token.colorWhite,
											}}
											className={cx(css`
												.ant-checkbox .ant-checkbox-inner {
													background-color: rgba(255, 255, 255, 0.4);
												}
											`)}
										>
											Remember me
										</Checkbox>
									</ConfigProvider>
								</Form.Item>
								<Form.Item>
									<Button
										size={"large"}
										htmlType={"submit"}
										block={true}
										type={"primary"}
									>
										Sign In
									</Button>
								</Form.Item>
							</Form>
						</Flex>
					</Col>
				</Row>
			</Card>
		</>
	)
}
