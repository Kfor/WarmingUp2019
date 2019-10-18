export interface UserInfo {
  userId: string;
  totalStorageCost: number;
  currency: number;
  loan: number;
  loanMax: number;
  rank: number;
}
export interface UserRank {
  userRank: UserInfo[];
  round: number;
}
