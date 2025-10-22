import { useUnit } from "effector-react";
import { $configs } from "../../../../../store";

export const usePrice = (
  price: string | number | null,
  filamentCount: number
) => {
  const configs = useUnit($configs);

  const filamentPrice = filamentCount * configs.filamentCoeff;
  const fixedFees = configs.packingPrice + configs.electricityPrice;
  const defectivePrice = (filamentPrice / 100) * configs.defectivePercent;

  const rawPrice = filamentPrice + fixedFees + defectivePrice;

  const discount = (rawPrice / 100) * configs.followersDiscount;

  const income = Number(price || 0) - rawPrice;
  const incomeFollower = income - discount;

  console.log(defectivePrice);
  return [
    { label: "Себестоимость", value: rawPrice },
    { label: "Филамент", value: filamentPrice },
    { label: "Упаковка", value: configs.packingPrice },
    { label: "Электричество", value: configs.electricityPrice },
    { label: "Брак", value: defectivePrice },
    { label: "Прибыль", value: income },
    { label: "Прибыль (подписчик)", value: incomeFollower },
  ];
};
