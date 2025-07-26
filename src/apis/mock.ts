export interface HistoryTransaction {
  buyer: string;
  seller: string;
  amount: string;
}

export const historyTransaction = [
  {
    buyer: "0x1234567890abcdef1234567890abcdef12345678",
    seller: "0x9876543210abcdef1234567890abcdef12345678",
    amount: "1.5 ETH",
  },
  {
    buyer: "0x2345678901abcdef1234567890abcdef12345678",
    seller: "0x8765432109abcdef1234567890abcdef12345678",
    amount: "2.0 ETH",
  },
  {
    buyer: "0x3456789012abcdef1234567890abcdef12345678",
    seller: "0x7654321098abcdef1234567890abcdef12345678",
    amount: "0.8 ETH",
  },
  {
    buyer: "0x4567890123abcdef1234567890abcdef12345678",
    seller: "0x6543210987abcdef1234567890abcdef12345678",
    amount: "3.2 ETH",
  },
  {
    buyer: "0x5678901234abcdef1234567890abcdef12345678",
    seller: "0x5432109876abcdef1234567890abcdef12345678",
    amount: "1.7 ETH",
  },
];
