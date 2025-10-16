import { Button, Drawer, Flex, Input } from "antd";
import { useUnit } from "effector-react";
import { $filaments } from "../../store";
import { useState, type FC } from "react";
import { FilamentsList } from "./components/FilamentsList/FilamentsList";
import { FilamentForm } from "./components/FilamentForm/FilamentForm";
import { ArrowLeftOutlined, CloseOutlined } from "@ant-design/icons";

type Props = {
  open: boolean;
  onClose: () => void;
};

export const Filaments: FC<Props> = ({ open, onClose }) => {
  const filaments = useUnit($filaments);

  const [isForm, setIsForm] = useState(false);
  const [editId, setEditId] = useState<null | string>(null);
  const [search, setSearch] = useState("");

  const handleEdit = (id: string) => {
    setIsForm(true);
    setEditId(id);
  };

  const handleAdd = () => {
    setIsForm(true);
  };

  const handleCancel = () => {
    setIsForm(false);
    setEditId(null);
  };

  const editingFilament = filaments.find((item) => item.id === editId);

  const filteredFilaments = filaments.filter((item) =>
    `${item.title}${item.code}${item.color}`
      .toLocaleLowerCase()
      .includes(search.toLocaleLowerCase())
  );

  return (
    <Drawer
      open={open}
      closable
      closeIcon={isForm ? <ArrowLeftOutlined /> : <CloseOutlined />}
      onClose={isForm ? handleCancel : onClose}
    >
      <Flex vertical gap={24}>
        {isForm ? (
          <FilamentForm item={editingFilament} onCancel={handleCancel} />
        ) : (
          <>
            <Flex gap={8}>
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Поиск"
                allowClear
              />
              <Button onClick={handleAdd} variant="filled" color="blue">
                Добавить
              </Button>
            </Flex>
            <FilamentsList onEdit={handleEdit} list={filteredFilaments} />
          </>
        )}
      </Flex>
    </Drawer>
  );
};
