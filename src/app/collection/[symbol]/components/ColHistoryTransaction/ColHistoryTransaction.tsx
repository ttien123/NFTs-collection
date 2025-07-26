"use client";
import { HistoryTransaction } from "@/apis/mock";
import { ColumnDef } from "@tanstack/react-table";
import { truncateAddress } from "@/lib/utils";

export const ColHistoryTransaction: ColumnDef<HistoryTransaction>[] = [
  {
    accessorKey: "buyer",
    header: "Buyer",
    cell: ({ row }) => {
      return <div>{truncateAddress(row.getValue("buyer"), 6)}</div>;
    },
  },
  {
    accessorKey: "seller",
    header: "Seller",
    cell: ({ row }) => {
      return <div>{truncateAddress(row.getValue("seller"), 6)}</div>;
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];
