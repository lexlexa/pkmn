import type { TItem, TPage } from "./store";

export const getItemFromPage = (data: TPage[], page: string, id: string) =>
  data.find((p) => p.id === page)?.cards.find((c) => c.id == id);

export const addItemToPage = (data: TPage[], page: string, item: TItem) =>
  data.map((p) => (p.id === page ? { ...p, cards: [...p.cards, item] } : p));

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
