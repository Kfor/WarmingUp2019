export interface Phone {
  ka: number;
  kb: number;
  kc: number;
  amount: number;
}
export interface UserInfo {
  userInfo:{
    userId: string;
    currency: number;
    loan: number;
    loanMax: number;
    totalStorageCost: number;
    ad: number;
    adCost: number;
    phoneNum: Phone[];
    initCurrency: number;
    lastProfit: number;
    angelCut: number;
  }
}
