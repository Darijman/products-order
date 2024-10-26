export enum Categories {
  Food = 'Food',
  House = 'House',
  Sport = 'Sport',
  Clothes = 'Clothes',
  Furniture = 'Furniture',
  Books = 'Books',
  Children = 'Children',
}

export interface Product {
  id: string;
  title: string;
  price: number;
  category: Categories;
  amount: number;
  image: string;
}
