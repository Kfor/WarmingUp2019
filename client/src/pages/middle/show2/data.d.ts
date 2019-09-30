export interface BasicGood {
  id: string;
  name?: string;
  barcode?: string;
  price?: string;
  num?: string | number;
  amount?: string | number;
}

export interface BasicProgress {
  key: string;
  time: string;
  rate: string;
  status: string;
  operator: string;
  cost: string;
}



export interface BasicPhone {
  id: string;
  chip: string;
  A: string;
  B: string;
  price: string;
  num?: string | number;
  amount?: string | number;
}



export interface BasicProfileDataType {
  basicGoods: BasicGood[];
  basicProgress: BasicProgress[];
  basicPhones: BasicPhone[];
}
