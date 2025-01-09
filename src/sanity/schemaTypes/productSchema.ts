import { defineType, defineField } from "sanity";

export const productSchema = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "productName",
      title: "Product Name",
      type: "string",
      validation: (Rule) =>
        Rule.required()
          .min(3)
          .max(20)
          .error("Product name must be between 3 and 20 characters"),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) =>
        Rule.required()
          .min(20)
          .max(200)
          .error("Description must be between 20 and 200 characters"),
    }),
    defineField({
      name: "size",
      title: "Sizes",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "XL", value: "Xl" },
          { title: "L", value: "L" },
          { title: "M", value: "M" },
          { title: "S", value: "S" },
          { title: "XS", value: "XS" },
        ],
        layout: "grid",
      },
      validation: (Rule) =>
        Rule.unique().min(1).error("At least one size must be selected"),
    }),
    defineField({
      name: "color",
      title: "Color",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: ["Purple", "Black", "Gold"], // Valid color values
      },
      validation: (Rule) =>
        Rule.required().min(1).error("At least one color must be selected"),
    }),
    defineField({
      name: "product_inventory",
      title: "Product Inventory",
      type: "number",
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(200)
          .error("Inventory must be between 1 and 200"),
    }),
    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .max(9999)
          .error("Price must be between 1 and 9999"),
    }),
  ],
});
