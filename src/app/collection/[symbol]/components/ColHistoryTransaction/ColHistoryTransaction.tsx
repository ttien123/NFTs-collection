"use client";
import { ColumnDef } from "@tanstack/react-table";
import { truncateAddress } from "@/lib/utils";
import { TransactionInfo } from "@/stores/transactionHistory.store";

export const ColHistoryTransaction: ColumnDef<TransactionInfo>[] = [
  {
    accessorKey: "from",
    header: "Buyer",
    cell: ({ row }) => {
      return <div>{truncateAddress(row.getValue("from"), 6)}</div>;
    },
  },
  {
    accessorKey: "to",
    header: "Seller",
    cell: ({ row }) => {
      return <div>{truncateAddress(row.getValue("to"), 6)}</div>;
    },
  },
  {
    accessorKey: "value",
    header: "Amount",
    cell: ({ row }) => {
      return <div>{row.getValue("value")} ETH</div>;
    },
  },
];
