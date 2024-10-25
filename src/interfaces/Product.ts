export enum Categories {
  FOOD = 'FOOD',
  HOUSE = 'HOUSE',
  SPORT = 'SPORT',
  CLOTHES = 'CLOTHES',
  FURNITURE = 'FURNITURE',
  BOOKS = 'BOOKS',
  CHILDREN = 'CHILDREN',
}

export interface Product {
  id: string;
  title: string;
  description?: string;
  price: number;
  category: Categories;
  amount: number;
  image: string;
}
