import { DataTable } from "@/components/DataTable/DataTable";
import React from "react";
import { ColHistoryTransaction } from "../ColHistoryTransaction/ColHistoryTransaction";
import { historyTransaction } from "@/apis/mock";

const HistoryTransaction = () => {
  return (
    <div>
      <DataTable columns={ColHistoryTransaction} data={historyTransaction} />
    </div>
  );
};

export default HistoryTransaction;
