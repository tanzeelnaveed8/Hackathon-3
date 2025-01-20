'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image'; // Import the Next.js Image component
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

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Men's Shoes</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product, index) => {
          // Ensure the image URL is correctly constructed
          const imageUrl = product.image?.asset?.url;
          const fullImageUrl = imageUrl || ''; // Directly use the full URL from Sanity

          // Check if the image URL is valid before rendering
          if (!fullImageUrl) {
            return (
              <div key={index} className="border rounded-lg p-4 shadow-md">
                <p>No Image Available</p>
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
          }

          return (
            <div key={index} className="border rounded-lg p-4 shadow-md">
              <Image
                src={fullImageUrl}
                alt={product.productName}
                width={500} // Adjust width as per your design
                height={500} // Adjust height as per your design
                className="object-cover mb-4 rounded"
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
