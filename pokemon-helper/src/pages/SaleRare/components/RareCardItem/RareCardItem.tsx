import { Input } from "antd";
import { changeCard, type TRareSaleCard } from "../../store";
import styles from "./RareCardItem.module.css";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LockOutlined,
  UnlockOutlined,
} from "@ant-design/icons";

type Props = {
  item: TRareSaleCard;
};

export const RareCardItem = ({ item }: Props) => {
  const handleHide = () => {
    changeCard({ ...item, isHidden: true });
  };

  const handleShow = () => {
    changeCard({ ...item, isHidden: false });
  };

  const handleChangePrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeCard({ ...item, price: event.target.value });
  };

  const handleRent = () => {
    changeCard({ ...item, isRented: true });
  };

  const handleUnrent = () => {
    changeCard({ ...item, isRented: false });
  };

  return (
    <div
      className={`${styles.item} ${item.isHidden ? styles.hidden : ""} ${
        item.isRented ? styles.rented : ""
      }`}
    >
      <div className={styles.title}>
        {item.number} {item.name}
      </div>
      <Input
        status={!item.price && !item.isHidden ? "error" : ""}
        style={{ width: 60 }}
        size="small"
        value={item.price}
        onChange={handleChangePrice}
      />
      {item.isHidden ? (
        <EyeOutlined onClick={handleShow} />
      ) : (
        <EyeInvisibleOutlined onClick={handleHide} />
      )}
      {item.isRented ? (
        <UnlockOutlined onClick={handleUnrent} />
      ) : (
        <LockOutlined onClick={handleRent} />
      )}
    </div>
  );
};
