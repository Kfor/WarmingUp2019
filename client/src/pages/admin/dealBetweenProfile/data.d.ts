export interface DealBetween {
  userId1: string;
  userId2: string;
  money: number;
  returnMoney: number;
  startTurn: number;
  endTurn: number;
}
export interface DealBetweenList {
  dealBetweenList: DealBetween[];
}
