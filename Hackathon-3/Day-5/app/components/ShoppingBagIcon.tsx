
import React from 'react';
import { ShoppingBagIcon } from '@heroicons/react/outline';
import { useCart } from '../hooks/useCart';

const ShoppingBagWithCount = () => {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <div className="relative flex items-center justify-center w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] gap-3 px-2 py-3">
      {/* Shopping Bag Icon */}
      <ShoppingBagIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 hover:text-black cursor-pointer" />
      
      {/* Cart Count Badge */}
      {cartCount > 0 && (
        <div className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {cartCount}
        </div>
      )}
    </div>
  );
};

export default ShoppingBagWithCount;
