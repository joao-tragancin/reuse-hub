import type { Item, ItemFormData, ItemStatus } from "./types";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(body?.message ?? "Não foi possível concluir a operação.");
  }

  if (response.status === 204) return undefined as T;
  return response.json();
}

export const api = {
  list: (query = "") => request<Item[]>(`/items${query}`),
  create: (data: ItemFormData) =>
    request<Item>("/items", { method: "POST", body: JSON.stringify(data) }),
  update: (id: number, data: ItemFormData) =>
    request<Item>(`/items/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  updateStatus: (id: number, status: ItemStatus) =>
    request<Item>(`/items/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
  remove: (id: number) => request<void>(`/items/${id}`, { method: "DELETE" }),
};
