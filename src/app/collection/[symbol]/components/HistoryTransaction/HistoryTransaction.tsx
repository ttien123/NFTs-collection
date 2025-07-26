"use client";
import { DataTable } from "@/components/DataTable/DataTable";
import React from "react";
import { ColHistoryTransaction } from "../ColHistoryTransaction/ColHistoryTransaction";
import useTransactionHistoryStore from "@/stores/transactionHistory.store";
import { useParams } from "next/navigation";

const HistoryTransaction = () => {
  const { address } = useParams<{ address: string }>();
  const { transactionInfo } = useTransactionHistoryStore();
  const dataHistory = transactionInfo.filter(
    (item) => item.addressNft === address
  );

  return (
    <div>
      <DataTable columns={ColHistoryTransaction} data={dataHistory} />
    </div>
  );
};

export default HistoryTransaction;
