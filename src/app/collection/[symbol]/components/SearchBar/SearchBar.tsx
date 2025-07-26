"use client";
import { Input } from "@/components/ui/input";
import { SearchSchema, TypeSearchSchema } from "@/utils/rules";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Dispatch, FC, SetStateAction } from "react";

const SearchBar: FC<{
  setValueSearch: Dispatch<SetStateAction<string>>;
}> = ({ setValueSearch }) => {
  const form = useForm<TypeSearchSchema>({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: TypeSearchSchema) {
    setValueSearch(values.name);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <div className="bg-white border rounded-lg flex">
                <Input
                  {...field}
                  type="text"
                  className="text-black px-3 py-2 shadow-none flex-grow !border-none !ring-0 !outline-none bg-transparent"
                  placeholder="Search NFTs by name"
                />
                <button
                  aria-label="Search"
                  className="rounded-sm py-2 px-6 flex-shink-0 hover:opacity-90"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </button>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default SearchBar;
