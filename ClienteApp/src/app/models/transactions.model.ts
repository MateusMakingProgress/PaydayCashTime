export interface TransactionsModel {
  id: string;
  transactionDate: string;
  description: string;
  transactionValue: number;
  exitJoin: number;
  payMethod: number;
  haveInstallments: boolean;
  totalInstallments: number;
  whoDid: string;
}
