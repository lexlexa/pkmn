import { CloseCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Flex, Typography, Upload } from "antd";
import styles from "./PokeballsImages.module.css";
import { usePokeballForm } from "../../form";


export const PokeballsImages = () => {
  const {
    values: { images },
    handlers: { addImage, deleteImage } } = usePokeballForm()
  const onDownloadedFile = (event: any) => {
    const file = event.fileList[event.fileList.length - 1];
    const status = file.status;

    if (status === "done") {
      const fileName = file.response.name;
      addImage(fileName)
    }
  };

  return (
    <Flex vertical gap={8}>
      <Typography.Text strong>Изображения</Typography.Text>
      <Flex wrap gap={8}>
        {images.map((item) => (
          <Flex style={{ position: "relative" }}>
            <img
              style={{
                width: 70,
                height: 70,
                objectFit: "cover",
                borderRadius: 8,
              }}
              src={`/api/images?name=${item}`}
            />
            <CloseCircleOutlined
              onClick={deleteImage(item)}
              className={styles.deleteImage}
            />
          </Flex>
        ))}
        <Upload
          action={"/api/images"}
          headers={{ token: localStorage.getItem("token") || "" }}
          name="pokeball-image"
          onDownload={onDownloadedFile}
          onChange={onDownloadedFile}
          showUploadList={false}
        >
          <div className={styles.add}>
            <PlusOutlined />
          </div>
        </Upload>
      </Flex>
    </Flex>
  );
};
