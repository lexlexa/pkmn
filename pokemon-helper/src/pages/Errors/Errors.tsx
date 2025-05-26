import {
  Button,
  Popover,
  Table,
  Typography,
  type TableColumnsType,
} from "antd";
import {
  $errors,
  loadErrorsFx,
  type TError,
  type TErrorByExpansion,
} from "./store";
import { useEffect, useState } from "react";
import { useUnit } from "effector-react";
import styles from "./Errors.module.css";
import { PictureOutlined } from "@ant-design/icons";
import { ChipByVariant } from "../../components/ChipByVariant/ChipByVariant";
import { RarityWithIcon } from "../../components/RarityWithIcon/RarityWithIcon";
import { withLayout } from "../../hocs/withLayout";

const mainTableColumns: TableColumnsType<TErrorByExpansion> = [
  {
    key: "image",
    title: "",
    width: "50px",
    render: (_, data) => {
      return (
        <img
          className={styles.expansionImage}
          src={data.errors[0].images.expansion}
        />
      );
    },
  },
  {
    key: "name",
    title: "Название",
    dataIndex: "expansion",
  },
  {
    key: "count",
    title: "Количество",
    width: "50px",
    align: "center",
    render: (_, data) => data.errors.length,
  },
];

const columns: TableColumnsType<TError> = [
  {
    key: "number",
    title: "№",
    dataIndex: "number",
  },
  {
    key: "name",
    title: "Название",
    dataIndex: "name",
  },
  {
    key: "variant",
    title: "Тип",
    dataIndex: "variant",
    width: "130px",
    align: "center",
    render: (_, data) => (
      <div className={styles.center}>
        <ChipByVariant variant={data.variant}>{data.variant}</ChipByVariant>
      </div>
    ),
  },
  {
    key: "rarity-i",
    dataIndex: "rarity",
    width: "30px",
    align: "center",
    render: (_, data) => (
      <div className={styles.center}>
        <RarityWithIcon rarity={data.rarity} />
      </div>
    ),
  },
  {
    key: "rarity",
    title: "Редкость",
    dataIndex: "rarity",
    width: "130px",
  },
  {
    key: "count",
    title: "Количество",
    dataIndex: "count",
    align: "center",
    width: "100px",
    render: (_, { count: [first, second] }) => {
      return (
        <>
          <Typography.Text type="danger">{first}</Typography.Text> -{" "}
          <Typography.Text type="danger">{second}</Typography.Text>
        </>
      );
    },
  },
  {
    key: "image",
    align: "center",
    width: "50px",
    render: (_, data) => {
      return (
        <Popover
          content={<img className={styles.cardImage} src={data.images.card} />}
        >
          <PictureOutlined />
        </Popover>
      );
    },
  },
];

export const Errors = withLayout(() => {
  const errors = useUnit($errors);
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

  useEffect(() => {
    loadErrorsFx();
  }, []);

  const handleExpand = (_: boolean, data: TErrorByExpansion) => {
    setExpandedRowKeys([data.expansion]);
    if (expandedRowKeys.includes(data.expansion)) {
      setExpandedRowKeys(
        expandedRowKeys.filter((item) => item !== data.expansion)
      );
    } else {
      setExpandedRowKeys([...expandedRowKeys, data.expansion]);
    }
  };

  const handleHideAll = () => {
    setExpandedRowKeys([]);
  };

  const handleShowAll = () => {
    setExpandedRowKeys(errors.map((item) => item.expansion));
  };

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <Button disabled={expandedRowKeys.length === 0} onClick={handleHideAll}>
          Свернуть все
        </Button>

        <Button
          disabled={expandedRowKeys.length === errors.length}
          onClick={handleShowAll}
        >
          Развернуть все
        </Button>
      </div>
      <div>
        <Table
          size="small"
          pagination={false}
          columns={mainTableColumns}
          dataSource={errors}
          style={{ width: "100%" }}
          rowKey={(record) => record.expansion}
          showHeader={false}
          expandable={{
            expandedRowRender: (record) => (
              <Table
                size="small"
                pagination={false}
                columns={columns}
                dataSource={record.errors}
                style={{ width: "100%" }}
              />
            ),
            expandRowByClick: true,
            expandedRowKeys: expandedRowKeys,
            onExpand: handleExpand,
          }}
        />
      </div>
    </div>
  );
});
