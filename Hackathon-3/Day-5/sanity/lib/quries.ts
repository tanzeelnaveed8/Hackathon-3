import { groq } from "next-sanity";
import { client } from "./client";

// Define a type for your product
export interface Product {
  _id: string;
  productName: string;
  category: string;
  price: number;
  inventory: number;
  colors: string[];
  status: string;
  image: {
    asset: {
      url: string;
    };
  };
  description: string;
}

// GROQ Query for fetching all products
export const fetchAllProducts = async (): Promise<Product[]> => {
  const query = groq`*[_type == "product"]`;
  return await client.fetch(query);
};

// GROQ Query for fetching 3 or 4 products
export const fetchLimitedProducts = async (limit = 3): Promise<Product[]> => {
  const query = groq`*[_type == "product"][0...${limit}]`;
  return await client.fetch(query);
};

// GROQ Query for fetching a single product by ID
export const fetchProductById = async (id: string): Promise<Product> => {
  const query = groq`*[_type == "product" && _id == $id][0]`;
  return await client.fetch(query, { id });
};
