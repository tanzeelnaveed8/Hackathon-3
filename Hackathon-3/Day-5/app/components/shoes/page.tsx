'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { Product } from '@/types/product';

const fetchProducts = async (): Promise<Product[]> => {
  const query = `*[_type == "product" && category == "Men's Shoes"][0..2]{
    productName,
    category,
    price,
    inventory,
    colors,
    status,
    image{
      asset->{
        _id,
        url
      }
    },
    description
  }`;
  return await client.fetch(query);
};

const ShoesPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // You can enhance this with a spinner or skeleton loader
  }

  if (error) {
    return <div>{error}</div>; // Display the error message
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Men's Shoes</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product, index) => {
          const imageUrl = product.image?.asset?.url;
          const fullImageUrl = imageUrl || '/default-placeholder.jpg'; // Provide a default image URL

          return (
            <div key={index} className="border rounded-lg p-4 shadow-md">
              <Image
                src={fullImageUrl}
                alt={product.productName}
                width={500} // Adjust width as per your design
                height={500} // Adjust height as per your design
                className="object-cover mb-4 rounded"
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  const target = e.target as HTMLImageElement; // Cast to HTMLImageElement
                  target.src = '/default-placeholder.jpg'; // Fallback image on error
                }}
              />
              <h2 className="text-xl font-semibold">{product.productName}</h2>
              <p className="text-gray-600">{product.type}</p>
              <p className="text-lg font-bold text-green-600">₹{product.price}</p>
              <p className="text-gray-500">{product.description}</p>
              <p className="mt-2">
                <span className="font-medium">Available Colors:</span>{' '}
                {product.colors.join(', ')}
              </p>
              <p className="mt-2">
                <span className="font-medium">Status:</span> {product.status}
              </p>
              <p className="mt-2">
                <span className="font-medium">Inventory:</span> {product.inventory}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShoesPage;
