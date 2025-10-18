import { Button, Drawer } from "antd"
import { OrderItem } from "./components/OrderItem/OrderItem"
import { PlusOutlined } from "@ant-design/icons"
// import { useState } from "react"



export const OrderForm = () => {
    // const [items, setItem] = useState([])
    return <Drawer open>
        <OrderItem />
        <Button icon={<PlusOutlined />}>Добавить</Button>
    </Drawer>
}