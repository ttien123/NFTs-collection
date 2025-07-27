import { z } from "zod";

export const SearchSchema = z.object({
  name: z.string().trim(),
});

export const PriceSchema = z
  .object({
    min_price: z.string(),
    max_price: z.string(),
  })
  .refine(
    (data) => {
      if (data.min_price !== "" && data.max_price !== "") {
        return Number(data.max_price) >= Number(data.min_price);
      }
      return true
    },
    {
      message: "The price is not reasonable",
      path: ["min_price"],
    }
  );

export type TypeSearchSchema = z.infer<typeof SearchSchema>;
export type TypePriceSchema = z.infer<typeof PriceSchema>;
