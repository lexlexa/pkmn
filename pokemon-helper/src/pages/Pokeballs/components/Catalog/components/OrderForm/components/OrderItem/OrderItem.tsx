import { Button, Flex, Typography } from "antd";
import { FormSelect } from "../../../../../../../../components/Form/components/Select/Select";
import { useUnit } from "effector-react";
import { $pokeballs } from "../../../../../../store";
import { useState } from "react";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { FormInput } from "../../../../../../../../components/Form/components/Input/Input";

// type TOrder = {
//     pokeballId: string;
//     accessories: ('horizontal' | 'vertical')[],
//     price: number;
//     comment: string;

// }

export const OrderItem = () => {
    const pokeballs = useUnit($pokeballs)


    const [pokeball, setPokeball] = useState<string | undefined>(undefined)
    const [price, setPrice] = useState<number | undefined>(undefined)

    const selectedPokeball = pokeballs.find(item => item.id === pokeball)

    return <Flex vertical gap={8} style={{ boxShadow: '0 0 4px 0 black', padding: 8, borderRadius: 8 }}>
        <Flex gap={8} style={{ width: '100%' }}>
            <div style={{ flexGrow: 1 }}>

                <FormSelect
                    value={pokeball}
                    onChange={setPokeball}
                    label="Покебол"
                    fixedWidth="100%"
                    options={pokeballs.map(item => ({ label: item.name, value: item.id }))}
                />
            </div>
            {selectedPokeball && <img style={{ width: 58, height: 58, borderRadius: 8 }} src={`/api/images?name=${selectedPokeball.images[0]}`} />}
        </Flex>
        <Flex style={{ width: '100%' }}>
            <FormInput fullWidth label="Цена" value={price} onChange={(value) => setPrice(Number(value))} />
        </Flex>
        <Flex vertical>
            <Typography.Text strong>Аксесуары <Button size="small" icon={<PlusOutlined />} /></Typography.Text>
            <Flex vertical>
                <Flex align="center" justify="space-between">
                    <Flex>Горизонтальная подставка</Flex>
                    <Flex gap={8} align="center">
                        <span>123р</span>
                        <Button color="red" variant="outlined" size="small" icon={<DeleteOutlined />} />
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    </Flex>
}