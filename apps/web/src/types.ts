export type ItemStatus = "DISPONIVEL" | "DOADO";

export interface Item {
  id: number;
  title: string;
  description: string;
  category: string;
  condition: string;
  city: string;
  contact: string;
  imageUrl: string | null;
  status: ItemStatus;
  createdAt: string;
  updatedAt: string;
}

export type ItemFormData = Omit<Item, "id" | "createdAt" | "updatedAt">;
