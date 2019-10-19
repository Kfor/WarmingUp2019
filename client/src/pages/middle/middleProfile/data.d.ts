export interface Phone {
  ka: number;
  kb: number;
  kc: number;
  amount: number;
}
export interface UserInfo {
  userInfo: {
    userId: string;
    chip1Num: number;
    chip2Num: number;
    chip3Num: number;
    currency: number;
    loan: number;
    loanMax: number;
    totalStorageCost: number;
    D: number;
    DCost: number;
    K: number;
    KCost: number;
    phoneNum: Phone[];
    angelInvest: number;
    lastProfit: number;
    angelCut: number;
  };
  round: number;
}
