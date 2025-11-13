import { useEffect, useState, type Key } from "react"
import { Button, Col, Collapse, Flex, Grid, Row, Tree, type TreeProps } from "antd"
import { $filaments, $filamentsBrands, $filamentsByType, $filamentTypesByBrand, filamentBrandsFxs, filamentsFxs, filamentTypesFxs } from "../../store/filaments"
import { useUnit } from "effector-react"
import { FilamentItem } from "./components/FilamentItem/FilamentItem"
import { FilamentForm } from "./components/FilamentForm/FilamentForm"
import { useEditOrCreateModal } from "../../../../helpers/useModal"


export const Filament = () => {
    const brands = useUnit($filamentsBrands)
    const typesByBrand = useUnit($filamentTypesByBrand)
    const filamentsByType = useUnit($filamentsByType)
    const filaments = useUnit($filaments)
    const [selectedType, setSelectedType] = useState<number | null>(null)
    const [isOpenedFilamentModal, editFilamentId, createFilament, editFilament, closeFilamentModal, filamentModalKey] = useEditOrCreateModal()



    const handleSelect: TreeProps['onSelect'] = (key) => {
        setSelectedType(Number((key[0] as string).split('-').at(-1)))
    }

    const filamentForEdit = filaments.find(item => item.id === editFilamentId)

    const treeItems = brands.map(brand => ({
        title: brand.name,
        selectable: false,
        key: `${brand.id}`,
        children: typesByBrand[brand.id].map(t => ({
            title: t.name,
            key: `${t.brand_id}-${t.id}`
        }))
    }))

    return <Flex vertical gap={16}>
        <Flex>
            <Button color="blue" variant="filled" onClick={createFilament}>Добавить филамент</Button>
        </Flex>
        <Flex>
            <Flex style={{ width: '200px', flexShrink: 0 }}>
                <Tree treeData={treeItems} onSelect={handleSelect} />
            </Flex>
            <Flex>
                <Row gutter={[16, 16]}>
                    {selectedType ?
                        filamentsByType[selectedType].map(item => <Col span={8} key={item.id}>
                            <FilamentItem
                                item={item}
                                onEdit={editFilament}
                            /></Col>) :
                        'Не выбрано'
                    }
                </Row>
            </Flex>
        </Flex>
        <FilamentForm
            key={filamentModalKey}
            open={isOpenedFilamentModal}
            onCancel={closeFilamentModal}
            item={filamentForEdit}
        />
    </Flex>
}