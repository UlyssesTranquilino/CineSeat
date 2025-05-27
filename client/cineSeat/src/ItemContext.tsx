// ItemContext.tsx
import { createContext } from "react";

export const itemPortal = createContext<{ food: string; drink: string }>({
  food: "",
  drink: "",
});
