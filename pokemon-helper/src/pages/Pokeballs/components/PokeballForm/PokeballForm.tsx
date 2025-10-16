import { Button, Drawer, Flex, Input, Upload } from "antd";
import styles from "./PokeballForm.module.css";
import { CloseCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { useState, type FC } from "react";
import {
  pokeballsFxs,
  type TPokeball,
  type TPokeballFilament,
} from "../../store";
import { PokeballFilaments } from "./components/PokeballsFilament/PokeballsFilament";
import { PokeballsPrice } from "./components/PokeballsPrice/PokeballsPrice";
import { generateUUID } from "../../../Sale/helpers";

type Props = {
  open: boolean;
  onClose: () => void;
  item?: TPokeball;
};

export const PokeballForm: FC<Props> = ({ open, onClose, item }) => {
  const [name, setName] = useState(item?.name || "");
  const [number, setNumber] = useState(item?.pokedexIndex || "");
  const [files, setFiles] = useState<string[]>(item?.images || []);
  const [filament, setFilament] = useState<Partial<TPokeballFilament>[]>(
    item?.filament || []
  );
  const [price, setPrice] = useState<number | null>(item?.price || null);

  const onDownloadedFile = (event: any) => {
    console.log(event);
    const file = event.fileList[0];
    const status = file.status;

    if (status === "done") {
      const fileName = file.response.name;
      setFiles([...files, fileName]);
    }
  };

  const filamentTotal = filament.reduce(
    (acc, curr) => acc + (curr.count || 0),
    0
  );

  const handleCreate = async () => {
    const data: TPokeball = {
      name,
      pokedexIndex: number,
      filament: filament as TPokeballFilament[],
      images: files,
      price: price || 0,
      id: generateUUID(),
    };

    await pokeballsFxs.createFx(data);
    onClose();
  };
  const handleEdit = async () => {
    const data: TPokeball = {
      id: item!.id,
      name,
      pokedexIndex: number,
      filament: filament as TPokeballFilament[],
      images: files,
      price: price || 0,
    };

    await pokeballsFxs.updateFx(data);
    onClose();
  };

  const handleDeleteImage = (index: number) => () => {
    setFiles(files.filter((_, i) => index !== i));
  };

  return (
    <Drawer open={open} onClose={onClose}>
      <div className={styles.form}>
        <h3 style={{ marginTop: 0 }}>Основная информация</h3>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Название"
        />
        <Input
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="Номер"
        />
        <PokeballFilaments items={filament} onChange={setFilament} />
        <div>
          <h3>Изображения</h3>
          <Upload
            action={"/api/images"}
            headers={{ token: localStorage.getItem("token") || "" }}
            name="pokeball-image"
            onDownload={onDownloadedFile}
            onChange={onDownloadedFile}
          >
            <Button type="primary" icon={<UploadOutlined />}>
              Загрузить изображения
            </Button>
          </Upload>
        </div>
        <Flex gap={8}>
          {files.map((item, index) => (
            <Flex style={{ position: "relative" }}>
              <img
                style={{
                  width: 80,
                  height: 80,
                  objectFit: "cover",
                  borderRadius: 8,
                }}
                src={`/api/images?name=${item}`}
              />
              <CloseCircleOutlined
                onClick={handleDeleteImage(index)}
                className={styles.deleteImage}
              />
            </Flex>
          ))}
        </Flex>
        <PokeballsPrice
          filamentTotal={filamentTotal}
          price={price}
          setPrice={setPrice}
        />
        <Button onClick={item ? handleEdit : handleCreate}>Сохранить</Button>
      </div>
    </Drawer>
  );
};
