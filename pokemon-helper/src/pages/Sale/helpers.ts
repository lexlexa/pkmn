import type { TItem, TPage } from "./store";

export const getItemFromPage = (data: TPage[], page: string, id: string) =>
  data.find((p) => p.id === page)?.cards.find((c) => c.id == id);

export const addItemToPage = (data: TPage[], page: string, item: TItem) =>
  data.map((p) => (p.id === page ? { ...p, cards: [...p.cards, item] } : p));

export const addItemToPageByIndex = (
  data: TPage[],
  page: string,
  item: TItem,
  index: number
) =>
  data.map((p) => {
    const data = [...p.cards];
    data.splice(index, 0, item);
    return p.id === page ? { ...p, cards: data } : p;
  });

export const deleteItemFromPage = (data: TPage[], page: string, id: string) =>
  data.map((p) =>
    p.id === page ? { ...p, cards: p.cards.filter((c) => c.id !== id) } : p
  );

export const changeItemOnPage = (
  data: TPage[],
  page: string,
  id: string,
  field: keyof TItem,
  value: string | boolean
) => {
  return data.map((p) =>
    p.id === page
      ? {
          ...p,
          cards: p.cards.map((c) =>
            c.id === id ? { ...c, [field]: value } : c
          ),
        }
      : p
  );
};

export const transferItemFromToPage = (
  data: TPage[],
  fromPage: string,
  toPage: string,
  id: string
) => {
  const item = getItemFromPage(data, fromPage, id);
  const dataWithoutDeleted = deleteItemFromPage(data, fromPage, id);
  const dataWithAdded = addItemToPage(dataWithoutDeleted, toPage, item!);
  return dataWithAdded;
};

export const setCardPositionOnPage = (
  data: TPage[],
  pageId: string,
  id: string,
  position: number
): TPage[] => {
  const page = data.find((item) => item.id === pageId);
  if (!page) return data;

  const currentPosition = page.cards.findIndex((item) => item.id === id);
  if (currentPosition === -1) return data;

  const maxPos = Math.min(position, page.cards.length - 1);
  const finalPos = Math.max(0, maxPos);

  const newCards = [...page.cards];
  const [removedItem] = newCards.splice(currentPosition, 1);
  newCards.splice(finalPos, 0, removedItem);

  return data.map((item) =>
    item.id === pageId ? { ...item, cards: newCards } : item
  );
};

export function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const swapCardsInPages = (
  data: TPage[],
  cardId1: string,
  cardId2: string
): TPage[] => {
  let card1: TItem | null = null;
  let card2: TItem | null = null;
  let page1Index: number = -1;
  let page2Index: number = -1;
  let card1Index: number = -1;
  let card2Index: number = -1;

  const newData = data.map((page, pageIndex) => {
    const newCards = page.cards
      .map((card, cardIndex) => {
        if (card.id === cardId1) {
          card1 = { ...card };
          page1Index = pageIndex;
          card1Index = cardIndex;
          return null;
        }
        if (card.id === cardId2) {
          card2 = { ...card };
          page2Index = pageIndex;
          card2Index = cardIndex;
          return null;
        }
        return card;
      })
      .filter((card): card is TItem => card !== null);

    return { ...page, cards: newCards };
  });

  if (card1 && card2 && page1Index !== -1 && page2Index !== -1) {
    newData[page1Index].cards.splice(card1Index, 0, card2);
    newData[page2Index].cards.splice(card2Index, 0, card1);
  }

  return newData;
};

export const transferItemFromToPageToIndex = (
  data: TPage[],
  fromPage: string,
  toPage: string,
  id: string,
  index: number
) => {
  const item = getItemFromPage(data, fromPage, id);
  const dataWithoutDeleted = deleteItemFromPage(data, fromPage, id);
  const dataWithAdded = addItemToPageByIndex(
    dataWithoutDeleted,
    toPage,
    item!,
    index
  );
  return dataWithAdded;
};
