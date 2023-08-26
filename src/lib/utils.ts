import { IRegistration } from "../types/globalTypes";

export function calculateTotalAmount(items: IRegistration[]) {
  let total = 0;

  for (const item of items) {
    const amount =
      typeof item.amount === "string" ? parseInt(item.amount, 10) : item.amount;
    if (amount !== 0) {
      total += amount;
    }
  }

  return total;
}
