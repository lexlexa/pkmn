import { CardVariants } from "../../constants";
import styles from "./ChipByVariant.module.css";

type TProps = {
  children: React.ReactNode;
  variant: CardVariants;
};

export const ChipByVariant = ({ children, variant }: TProps) => {
  const classByVariant = {
    [CardVariants.NORMAL_HOLO]: styles.normalHolo,
    [CardVariants.REVERSE_HOLO]: styles.reverseHolo,
    [CardVariants.NORMAL]: "",
  };
  return (
    <div className={`${classByVariant[variant]} ${styles.item}`}>
      {children}
    </div>
  );
};
