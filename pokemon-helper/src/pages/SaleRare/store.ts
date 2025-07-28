import { createEffect, createEvent, createStore, sample } from "effector";
import { ApiInstance } from "../../helpers/api";

export type TRareSaleCard = {
  expansion: string;
  number: string;
  name: string;
  image: string;
  price: string;
  isRented: boolean;
  isHidden: boolean;
};

export type TRareSaleCards = {
  expansion: string;
  cards: TRareSaleCard[];
};

export const loadSaleRareCardsFx = createEffect(async () => {
  const response = await ApiInstance.get("/api/salerare/list");
  return response.data as TRareSaleCards[];
});

export const saveSaleRare = createEvent("save salerare");
export const changeExpansion = createEvent<TRareSaleCards>("change expansion");
export const changeCard = createEvent<TRareSaleCard>("change card");

export const $rareSaleCards = createStore<TRareSaleCards[]>([])
  .on(loadSaleRareCardsFx.doneData, (_, payload) => payload)
  .on(changeExpansion, (state, payload) =>
    state.map((item) => {
      if (item.expansion === payload.expansion) {
        return payload;
      }
      return item;
    })
  )
  .on(changeCard, (state, payload) =>
    state.map((item) => {
      if (item.expansion === payload.expansion) {
        return {
          ...item,
          cards: item.cards.map((card) => {
            if (card.number === payload.number) {
              return payload;
            }
            return card;
          }),
        };
      }
      return item;
    })
  );

type TSaveData = {
  [key: string]: {
    isHidden: boolean;
    cards: {
      number: string;
      price: string;
      isHidden: boolean;
      isRented: boolean;
    }[];
  };
};

export const saveSaleRareCardsFx = createEffect(async (data: TSaveData) => {
  await ApiInstance.post("/api/salerare/change", data);
});

sample({
  clock: saveSaleRare,
  source: $rareSaleCards,
  fn: (cards): TSaveData => {
    return cards.reduce((acc, curr) => {
      return {
        ...acc,
        [curr.expansion]: {
          cards: curr.cards.map(({ price, isHidden, isRented, number }) => ({
            price,
            isHidden,
            isRented,
            number,
          })),
        },
      };
    }, {});
  },
  target: saveSaleRareCardsFx,
});
