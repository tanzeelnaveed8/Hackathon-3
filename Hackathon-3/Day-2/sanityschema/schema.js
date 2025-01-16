export default defineType({
    name: 'shoeProduct',
    title: 'Shoe Product',
    type: 'document',
    fields: [
      defineField({
        name: 'name',
        title: 'Product Name',
        type: 'string',
        validation: (Rule) => Rule.required().min(3).max(50),
      }),
      defineField({
        name: 'description',
        title: 'Description',
        type: 'text',
        validation: (Rule) => Rule.required().min(10).max(500),
      }),
      defineField({
        name: 'price',
        title: 'Price',
        type: 'number',
        validation: (Rule) => Rule.required().min(1),
      }),
      defineField({
        name: 'image',
        title: 'Product Image',
        type: 'image',
        options: {
          hotspot: true,
        },
        fields: [
          {
            name: 'alt',
            title: 'Alternative Text',
            type: 'string',
            options: {
              isHighlighted: true,
            },
            validation: (Rule) => Rule.required(),
          },
        ],
      }),
      defineField({
        name: 'sizes',
        title: 'Available Sizes',
        type: 'array',
        of: [{ type: 'string' }],
        options: {
          layout: 'tags',
        },
      }),
      defineField({
        name: 'categories',
        title: 'Categories',
        type: 'array',
        of: [{
          type: 'reference',
          to: [{ type: 'category' }],
        }],
      }),
      defineField({
        name: 'inStock',
        title: 'In Stock',
        type: 'boolean',
        initialValue: true,
      }),
      defineField({
        name: 'sku',
        title: 'SKU (Stock Keeping Unit)',
        type: 'string',
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: 'releaseDate',
        title: 'Release Date',
        type: 'datetime',
      }),
    ],
  });
  