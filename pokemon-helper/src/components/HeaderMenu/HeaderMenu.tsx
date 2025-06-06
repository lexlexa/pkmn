import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router";

const MenuItems = [
  { key: "/", label: "Pokemon" },
  { key: "/errors", label: "Ошибки" },
  { key: "/statistics", label: "Статистика" },
  // { key: "/collection", label: "Коллекция" },
  { key: "/sync", label: "Синхронизация" },
  { key: "/load", label: "Загрузка" },
  { key: "/utils", label: "Утилиты" },
  { key: "/sale", label: "Витрина" },
];

export const HeaderMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = (data: { key: string }) => {
    navigate(`${data.key}`);
  };

  return (
    <Menu
      theme="dark"
      items={MenuItems}
      selectedKeys={[location.pathname]}
      onSelect={handleChange}
      mode="horizontal"
    />
  );
};
