"use client";
import InputNumber from "@/components/InputNumber/InputNumber";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PriceSchema, TypePriceSchema } from "@/utils/rules";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";

const Filter: FC<{
  handleFilterPrice: (data: TypePriceSchema) => void;
  handleSortDirection: (direction: "asc" | "desc") => void;
}> = ({ handleFilterPrice, handleSortDirection }) => {
  const form = useForm<TypePriceSchema>({
    resolver: zodResolver(PriceSchema),
    defaultValues: {
      min_price: "",
      max_price: "",
    },
  });

  function onSubmit(data: TypePriceSchema) {
    console.log("Submitted Data:", data);
    handleFilterPrice(data);
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Price Range Filter */}
      <div className="space-y-4">
        <label className="text-sm font-medium">Price Range (ETH)</label>
        <div className="space-y-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, (error) => {
                console.log("Form Errors:", error);
              })}
              className="mt-2"
            >
              <div className="flex items-start">
                <FormField
                  control={form.control}
                  name="min_price"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <InputNumber
                          type="text"
                          className="grow"
                          placeholder="Minimum Price"
                          classNameInput="p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"
                          onChange={(event) => {
                            field.onChange(event);
                            form.trigger("min_price");
                          }}
                          value={field.value}
                          classNameError="hidden"
                          ref={field.ref}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="mx-2 mt-2 shrink-0">-</div>
                <FormField
                  control={form.control}
                  name="max_price"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <InputNumber
                          type="text"
                          className="grow"
                          placeholder="Maximum Price"
                          classNameInput="p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm"
                          onChange={(event) => {
                            field.onChange(event);
                            form.trigger("max_price");
                          }}
                          value={field.value}
                          classNameError="hidden"
                          ref={field.ref}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-1 text-red-600 min-h-[1rem] text-base text-left">
                {form.formState.errors.min_price?.message}
              </div>
              <Button
                type="submit"
                className="w-[120px] mt-1 h-9 rounded-md bg-indigo-900 text-white font-medium duration-200 hover:bg-indigo-950 transition-colors"
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>

      {/* Sort Direction Filter */}
      <div className="space-y-4">
        <label className="text-sm font-medium">Sort Direction</label>
        <Select defaultValue="asc" onValueChange={handleSortDirection}>
          <SelectTrigger>
            <SelectValue placeholder="Select direction" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Ascending</SelectItem>
            <SelectItem value="desc">Descending</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Filter;
