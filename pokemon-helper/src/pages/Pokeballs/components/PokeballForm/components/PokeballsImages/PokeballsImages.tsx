import { CloseCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Flex, Typography, Upload } from "antd";
import { type FC } from "react";
import styles from "./PokeballsImages.module.css";
type Props = {
  files: string[];
  setFiles: (files: string[]) => void;
};

export const PokeballsImages: FC<Props> = ({ files, setFiles }) => {
  const onDownloadedFile = (event: any) => {
    const file = event.fileList[event.fileList.length - 1];
    const status = file.status;

    if (status === "done") {
      const fileName = file.response.name;
      setFiles([...files, fileName]);
    }
  };

  const handleDeleteImage = (index: number) => () => {
    setFiles(files.filter((_, i) => index !== i));
  };

  return (
    <Flex vertical gap={8}>
      <Typography.Text strong>Изображения</Typography.Text>
      <Flex wrap gap={8}>
        {files.map((item, index) => (
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
              onClick={handleDeleteImage(index)}
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
