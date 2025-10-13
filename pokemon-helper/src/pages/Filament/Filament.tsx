import { Button } from "antd";
import { withLayout } from "../../hocs/withLayout";
import styles from "./Filament.module.css";
import { useUnit } from "effector-react";
import { $filament, fetchFilamentListFx } from "./store";
import { useEffect, useState } from "react";
import { WithDrawer } from "../../components/WithDrawer/WithDrawer";
import { FilamentForm } from "./components/FilamentForm/FilamentForm";
import { FilamentItem } from "./components/FilamentItem/FilamentItem";

export const Filament = withLayout(() => {
  const filament = useUnit($filament);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<null | string>(null);

  const handleEdit = (id: string) => {
    setEditId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setEditId(null);
    setOpen(false);
  };

  useEffect(() => {
    fetchFilamentListFx();
  }, []);

  const editItem = filament.find((item) => item.id === editId);

  return (
    <div className={styles.container}>
      <Button onClick={() => setOpen(true)}>Add</Button>
      <div className={styles.content}>
        {filament.map((item) => (
          <FilamentItem onEdit={handleEdit} key={item.id} item={item} />
        ))}
      </div>
      <WithDrawer open={open} onClose={handleClose}>
        {open && <FilamentForm onSuccess={handleClose} item={editItem} />}
      </WithDrawer>
    </div>
  );
});
