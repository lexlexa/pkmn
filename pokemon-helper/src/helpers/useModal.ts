import { useId, useState } from "react";

export const useModal = (
  defaultValue = false
): [boolean, () => void, () => void] => {
  const [isOpen, setIsOpen] = useState(defaultValue);
  return [isOpen, () => setIsOpen(true), () => setIsOpen(false)];
};

export const useEditOrCreateModal = <T extends number | string>(): [boolean, T | null, () => void, (id: T) => void, () => void, string] => {
  const [isOpen, open, close] = useModal(false)
  const [editId, setEditId] = useState<T | null>(null)
  const id = useId()

  const handleClose = () => {
    close()
    setEditId(null)
  }

  const openForCreate = () => {
    open()
    setEditId(null)
  }

  const openForEdit = (id: T) => {
    open()
    setEditId(id)
  }

  return [isOpen, editId, openForCreate, openForEdit, handleClose, `${id}-${isOpen}-${editId}`]
}