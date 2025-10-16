import { Button, Drawer, Flex, Input, Typography } from "antd";
import { useEffect, type FC } from "react";
import { useForm } from "../../../../helpers/form";
import { useUnit } from "effector-react";
import { $configs, configsFxs } from "../../store";

type Props = {
  open: boolean;
  onClose: () => void;
};

export const Configs: FC<Props> = ({ open, onClose }) => {
  const configs = useUnit($configs);

  const { values, onInputChange, handleSubmit, updateValues } = useForm({
    defaultValues: configs,
    onSubmit: (data) => {
      configsFxs.updateFx({
        filamentCoeff: Number(data.filamentCoeff),
        followersDiscount: Number(data.followersDiscount),
        packingPrice: Number(data.packingPrice),
        defaultStandPrice: Number(data.defaultStandPrice),
        verticalStandPrice: Number(data.verticalStandPrice),
        electricityPrice: Number(data.electricityPrice),
      });
    },
  });

  useEffect(() => {
    updateValues(configs);
  }, [configs]);

  return (
    <Drawer open={open} onClose={onClose}>
      <Typography.Title level={4} style={{ marginTop: 0 }}>
        Настройки
      </Typography.Title>
      <Flex vertical gap={24}>
        <Flex vertical gap={8}>
          <div>Коэфициэнт филамента (стоимость 1г.)</div>
          <Input
            value={values.filamentCoeff}
            onChange={onInputChange("filamentCoeff")}
            placeholder="0"
          />
        </Flex>
        <Flex vertical gap={8}>
          <div>Стоимость упаковки</div>
          <Input
            value={values.packingPrice}
            onChange={onInputChange("packingPrice")}
            placeholder="0"
          />
        </Flex>
        <Flex vertical gap={8}>
          <div>Средняя стоимость электричества на один покеболл</div>
          <Input
            value={values.electricityPrice}
            onChange={onInputChange("electricityPrice")}
            placeholder="0"
          />
        </Flex>
        <Flex vertical gap={8}>
          <div>Скидка подписчикам (%)</div>
          <Input
            value={values.followersDiscount}
            onChange={onInputChange("followersDiscount")}
            placeholder="0"
          />
        </Flex>
        <Typography.Title level={4} style={{ marginTop: 0 }}>
          Дополнительные товары
        </Typography.Title>
        <Flex vertical gap={8}>
          <div>Цена обычной подставки</div>
          <Input
            value={values.defaultStandPrice}
            onChange={onInputChange("defaultStandPrice")}
            placeholder="0"
          />
        </Flex>
        <Flex vertical gap={8}>
          <div>Цена вертикальной подставки</div>
          <Input
            value={values.verticalStandPrice}
            onChange={onInputChange("verticalStandPrice")}
            placeholder="0"
          />
        </Flex>
        <Button onClick={handleSubmit}>Сохранить</Button>
      </Flex>
    </Drawer>
  );
};
