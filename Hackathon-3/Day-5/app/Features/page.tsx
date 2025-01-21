'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // Import Next.js Image component
import { client } from '@/sanity/lib/client'; // Sanity client import

import { Product } from '@/types/product';

// Fetch function for products (adjusting to fetch 'type' instead of 'category')
const fetchAllProducts = async (): Promise<Product[]> => {
  const query = `*[_type == "product"]{
    productName,
    type,  // Adjusted 'category' to 'type'
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

const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchAllProducts();
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
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product, index) => {
          const imageUrl = product.image?.asset?.url;
          const fullImageUrl = imageUrl && !imageUrl.startsWith('https://cdn.sanity.io')
            ? `https://cdn.sanity.io${imageUrl}`
            : imageUrl;

          if (!fullImageUrl) {
            return (
              <div key={index} className="border rounded-lg p-4 shadow-md">
                <p>No Image Available</p>
                <h2 className="text-xl font-semibold">{product.productName}</h2>
                <p className="text-gray-600">{product.type}</p> {/* Using 'type' */}
                <p className="text-lg font-bold text-green-600">₹{product.price}</p>
                <p className="text-gray-500">{product.description}</p>
              </div>
            );
          }

          return (
            <div key={index} className="border rounded-lg p-4 shadow-md">
              <Image
                src={fullImageUrl}
                alt={product.productName}
                width={500}
                height={500}
                className="object-cover mb-4 rounded"
              />
              <h2 className="text-xl font-semibold">{product.productName}</h2>
              <p className="text-gray-600">{product.type}</p> {/* Using 'type' */}
              <p className="text-lg font-bold text-green-600">₹{product.price}</p>
              <p className="text-gray-500">{product.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SidebarWithProducts = () => {
  const [openSection, setOpenSection] = useState({
    gender: true,
    price: true,
    kids: true,
  });

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleSection = (section: 'gender' | 'price' | 'kids') => {
    setOpenSection((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleNavbar = () => {
    setIsNavbarOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Toggle Button for Navbar (Mobile) */}
      <button className="lg:hidden p-4 text-black bg-white" onClick={toggleNavbar}>
        {isNavbarOpen ? 'Close' : 'Menu'}
      </button>

      {/* Left Sidebar (Navbar) */}
      <nav
        className={`w-full lg:w-[250px] bg-gray-100 h-screen px-4 py-6 overflow-y-auto border-b lg:border-r lg:border-gray-300 ${isNavbarOpen ? 'block' : 'hidden lg:block'}`}
      >
        <ul className="space-y-6">
          {/* Gender Section */}
          <li>
            <h2 className="font-bold text-lg text-black cursor-pointer flex justify-between items-center" onClick={() => toggleSection('gender')}>
              Gender
              <span>
                {openSection.gender ? (
                  <span>&#9650;</span> // Up arrow
                ) : (
                  <span>&#9660;</span> // Down arrow
                )}
              </span>
            </h2>
            {openSection.gender && (
              <ul className="space-y-2 pl-4 mt-2">
                {['Men', 'Women', 'Unisex'].map((item, index) => (
                  <li key={index}>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                      />
                      <span className="text-black">{item}</span>
                    </label>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Other sections... */}
        </ul>
      </nav>

      {/* Main Content Section */}
      <div className="flex-1">
        <ProductsList />
      </div>
    </div>
  );
};

export default SidebarWithProducts;
