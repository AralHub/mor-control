import { Breadcrumb, type BreadcrumbProps, Flex, Space, Typography } from "antd"
import { type FC, type ReactNode } from "react"

interface PageHeaderProps {
	title: string
	breadcrumb: BreadcrumbProps["items"]
	extra?: ReactNode
}

const PageHeader: FC<PageHeaderProps> = ({ title, breadcrumb, extra }) => {
	return (
		<>
			<Flex
				gap={8}
				justify={"space-between"}
			>
				<div>
					<Typography.Title
						level={3}
						style={{ color: "#082f32" }}
					>
						{title}
					</Typography.Title>
					<Breadcrumb items={breadcrumb} />
				</div>
				{extra && <Space>{extra}</Space>}
			</Flex>
		</>
	)
}

export { PageHeader }
