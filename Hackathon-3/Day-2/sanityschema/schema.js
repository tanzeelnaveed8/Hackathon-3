export default {
  // Define the document type and its name
  name: 'product',
  type: 'document',
  title: 'Product', // The title displayed in the CMS for this document
  fields: [
    {
      // Field for the product's name
      name: 'name',
      type: 'string', // Basic text field
      title: 'Product Name', // Label for the field in the CMS
      validation: (Rule) => 
        Rule.required() // Makes this field mandatory
          .max(100) // Restricts the maximum length to 100 characters
          .error('Product name is required and cannot exceed 100 characters.'),
    },
    {
      // Slug field for generating a URL-friendly identifier
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'URL-friendly identifier for the product.', // Helper text in the CMS
      options: {
        source: 'name', // Automatically generates the slug based on the product name
        maxLength: 200, // Limits the slug length
      },
      validation: (Rule) => 
        Rule.required().error('Slug is required for product identification.'),
    },
    {
      // Field for a detailed description of the product
      name: 'description',
      type: 'text', // Multi-line text field
      title: 'Description',
      description: 'Detailed description of the product.',
      validation: (Rule) =>
        Rule.required() // Makes this field mandatory
          .min(20) // Requires at least 20 characters
          .max(500) // Limits to a maximum of 500 characters
          .error('Description must be between 20 and 500 characters.'),
    },
    {
      // Field for the product's price
      name: 'price',
      type: 'number', // Numeric field
      title: 'Product Price',
      validation: (Rule) => 
        Rule.required() // Makes this field mandatory
          .min(0) // Ensures the price is non-negative
          .error('Product price must be a positive value.'),
    },
    {
      // Field for the discount percentage
      name: 'discountPercentage',
      type: 'number',
      title: 'Discount Percentage',
      description: 'Percentage discount on the product.',
      validation: (Rule) =>
        Rule.min(0) // Ensures the discount is not negative
          .max(100) // Ensures the discount does not exceed 100%
          .error('Discount percentage must be between 0 and 100.'),
    },
    {
      // Field for the price before the discount
      name: 'priceWithoutDiscount',
      type: 'number',
      title: 'Price Without Discount',
      description: 'Original price of the product before discount.',
      readOnly: true, // Makes this field non-editable in the CMS
      // Optional: Auto-calculate this field based on price and discount
      initialValue: (doc) => doc.price / (1 - doc.discountPercentage / 100),
    },
    {
      // Field for the product's rating
      name: 'rating',
      type: 'number',
      title: 'Rating',
      description: 'Average rating of the product.',
      validation: (Rule) =>
        Rule.min(0) // Ensures the rating is not negative
          .max(5) // Limits the rating to a maximum of 5
          .precision(1) // Allows one decimal place
          .error('Rating must be between 0 and 5.'),
    },
    {
      // Field for the number of ratings the product has received
      name: 'ratingCount',
      type: 'number',
      title: 'Rating Count',
      description: 'Total number of ratings received by the product.',
      validation: (Rule) => Rule.min(0).error('Rating count must be a non-negative number.'),
    },
    {
      // Array field for tags associated with the product
      name: 'tags',
      type: 'array',
      title: 'Tags',
      of: [{ type: 'string' }], // Each tag is a string
      options: {
        layout: 'tags', // Allows for tag-style input
      },
      description: 'Add tags such as "new arrival", "bestseller", or "limited edition".',
    },
    {
      // Array field for available product sizes
      name: 'sizes',
      type: 'array',
      title: 'Sizes',
      of: [{ type: 'string' }], // Each size is a string
      options: {
        layout: 'tags', // Allows for tag-style input
      },
      description: 'Available sizes for the product (e.g., S, M, L, XL, XXL).',
    },
    {
      // Field for the product image
      name: 'image',
      type: 'image',
      title: 'Product Image',
      description: 'High-quality image of the product.',
      options: {
        hotspot: true, // Enables cropping and focal point selection
      },
      validation: (Rule) => Rule.required().error('Product image is required.'),
    },
    {
      // Field for the SEO-friendly title
      name: 'seoTitle',
      type: 'string',
      title: 'SEO Title',
      description: 'Title for SEO optimization (max 60 characters).',
      validation: (Rule) => Rule.max(60).error('SEO title cannot exceed 60 characters.'),
    },
    {
      // Field for the SEO-friendly description
      name: 'seoDescription',
      type: 'text',
      title: 'SEO Description',
      description: 'Meta description for SEO optimization (max 160 characters).',
      validation: (Rule) => Rule.max(160).error('SEO description cannot exceed 160 characters.'),
    },
  ],
};
