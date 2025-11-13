import { Drawer } from "antd";
import { createEvent, createStore } from "effector"
import { useUnit } from "effector-react";
import { useState, type FC, type PropsWithChildren } from "react";


type ModalData = {
    isOpened: boolean;
    editId: number | string | null;
}

export const createEffectorModal = () => {
    const defaultData = {
        isOpened: false,
        editId: null
    }

    const openModal = createEvent()
    const closeModal = createEvent()
    const openEditModal = createEvent<number | string | null>()

    const $modal = createStore<ModalData>(defaultData)
        .on(openModal, (state) => ({ ...state, isOpened: true }))
        .on(closeModal, (state) => ({ ...state, isOpened: false, editId: null }))
        .on(openEditModal, (state, payload) => ({ ...state, isOpened: true, editId: payload }))

    return {
        $modal,
        openModal: () => openModal(),
        closeModal: () => closeModal(),
        openEditModal: (id: ModalData['editId']) => openEditModal(id)
    }
}

type Props = {
    data: ReturnType<typeof createEffectorModal>
    children: (id: number | string | null) => React.ReactNode
}

export const DrawerWithEffector: FC<Props> = ({ data, children }) => {
    const modalData = useUnit(data.$modal)

    return <Drawer onClose={() => data.closeModal()} destroyOnClose open={modalData.isOpened}>
        {children(modalData.editId)}
    </Drawer>
}

