import { Button, Dropdown, Flex, Typography } from "antd"
import { useUnit } from "effector-react"
import { $configs, Accessories } from "../../../../../../store"
import { AccessoriesLang } from "../../../../../../constants"
import { useOrderForm } from "../../form"
import type { FC } from "react"
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons"

type Props = {
    itemId: string,
    accessories: [Accessories, number][]
}

export const OrderItemAccessories: FC<Props> = ({ itemId, accessories }) => {
    const { handlers: { addItemAccessory, deleteItemAccessory } } = useOrderForm()
    const configs = useUnit($configs)
    return <Flex vertical>
        <Flex gap={16}>
            <Typography.Text strong>Аксесуары</Typography.Text>
            <Dropdown
                trigger={["click"]}
                getPopupContainer={() => document.body}
                menu={{
                    items: Object.keys(configs.accessoriesPrices).map((key) => ({
                        key,
                        label: AccessoriesLang[key as Accessories],
                        onClick: addItemAccessory(itemId, [
                            key as Accessories,
                            configs.accessoriesPrices[key as Accessories],
                        ]),
                    })),
                }}
            >
                <Button size="small" icon={<PlusOutlined />} />
            </Dropdown>
        </Flex>
        <Flex vertical>
            {accessories.map(([key, price], index) => (
                <Flex align="center" justify="space-between">
                    <Flex>{AccessoriesLang[key]}</Flex>
                    <Flex gap={8} align="center">
                        <span>{price}р</span>
                        <Button
                            color="red"
                            variant="outlined"
                            size="small"
                            onClick={deleteItemAccessory(itemId, index)}
                            icon={<DeleteOutlined />}
                        />
                    </Flex>
                </Flex>
            ))}
        </Flex>
    </Flex>
}