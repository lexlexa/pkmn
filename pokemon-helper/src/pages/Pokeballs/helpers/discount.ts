export const getDiscountedPrice = (
  price: number | string,
  discount: number
) => {
  const discountedAmount = (Number(price) / 100) * discount;
  return (Number(price) - discountedAmount).toFixed(2);
};
