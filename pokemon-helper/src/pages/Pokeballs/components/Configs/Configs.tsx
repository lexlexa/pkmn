import { Button, Drawer, Flex, Input, Typography } from "antd";
import { useEffect, useState, type FC } from "react";
import { useForm } from "../../../../helpers/form";
import { useUnit } from "effector-react";
import { $configs, Accessories, configsFxs } from "../../store";
import { FormInput } from "../../../../components/Form/components/Input/Input";
import { AccessoriesLang } from "../../constants";

type Props = {
  open: boolean;
  onClose: () => void;
};

export const Configs: FC<Props> = ({ open, onClose }) => {
  const configs = useUnit($configs);

  const [accessoriesPrices, setAccessoriesPrices] = useState(
    configs.accessoriesPrices
  );

  useEffect(() => {
    setAccessoriesPrices(configs.accessoriesPrices);
  }, [configs]);

  const { values, onInputChange, handleSubmit, updateValues } = useForm({
    defaultValues: configs,
    onSubmit: (data) => {
      configsFxs.updateFx({
        filamentCoeff: Number(data.filamentCoeff),
        followersDiscount: Number(data.followersDiscount),
        packingPrice: Number(data.packingPrice),
        electricityPrice: Number(data.electricityPrice),
        defectivePercent: Number(data.defectivePercent),
        accessoriesPrices: accessoriesPrices,
      });
      onClose();
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
        <Flex vertical gap={8}>
          <div>Процент брака (%)</div>
          <Input
            value={values.defectivePercent}
            onChange={onInputChange('defectivePercent')}
            placeholder="0"
          />
        </Flex>
        <Typography.Title level={4} style={{ marginTop: 0 }}>
          Аксесуары
        </Typography.Title>
        {Object.keys(accessoriesPrices).map((key) => {
          const k = key as Accessories;
          const value = accessoriesPrices[k];

          return (
            <FormInput
              key={k}
              value={value}
              label={AccessoriesLang[k]}
              onChange={(val) =>
                setAccessoriesPrices((state) => ({ ...state, [k]: val }))
              }
            />
          );
        })}
        {/* <Flex vertical gap={8}>
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
        </Flex> */}
        <Button onClick={handleSubmit}>Сохранить</Button>
      </Flex>
    </Drawer>
  );
};
