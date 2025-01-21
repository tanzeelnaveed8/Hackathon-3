// components/ProductCard.tsx
import React from 'react';
import Image from 'next/image';
import { Product } from '@/types/product';
import { useCart } from '../hooks/useCart';

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();

  const imageUrl = product.image?.asset?.url || '';

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <Image
        src={imageUrl}
        alt={product.productName}
        width={500}
        height={500}
        className="object-cover mb-4 rounded"
      />
      <h2 className="text-xl font-semibold">{product.productName}</h2>
      <p className="text-gray-600">{product.type}</p>
      <p className="text-lg font-bold text-green-600">₹{product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
