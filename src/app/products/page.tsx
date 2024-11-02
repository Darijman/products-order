'use client';

import { ProductCard } from '../../components/productCard/ProductCard';
import { Cart } from '../../components/cart/Cart';
import { useCartStore } from '../../stores/useCartStore/useCartStore';
import { useSearchParams } from 'next/navigation';
import { useProductsStore } from '../../stores/useProductsStore/useProductsStore';
import './products.css';

const Products = () => {
  const { cartProducts, shippingPrice } = useCartStore();
  const { products, categoryProducts } = useProductsStore();
  const searchParams = useSearchParams();

  const category = searchParams.get('category');
  const totalPrice: number = cartProducts.reduce((acc, product) => acc + product.price * product.amount, shippingPrice);

  console.log(`products`, products);

  return (
    <div className='products'>
      <div className='products_top'>
        <h1 className='products_title'>{!category ? 'Products' : `Products → ${category}`}</h1>
        <h3 className='products_total_price'>Total price $ {totalPrice}</h3>
      </div>
      <Cart />
      <div className='products_grid'>
        {!category ? (
          <>
            {products.map((product, index) => {
              return <ProductCard key={index} product={product} />;
            })}
          </>
        ) : (
          <>
            {categoryProducts.map((product, index) => {
              return <ProductCard key={index} product={product} />;
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
