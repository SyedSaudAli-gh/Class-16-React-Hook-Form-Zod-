"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { client } from "@/sanity/lib/client";

// Zod schema for validation
const formSchema = z.object({
  productName: z
    .string()
    .min(3, "Product name min 3 characters")
    .max(20, "Product name max 20 characters"),
  description: z
    .string()
    .min(20, "Product description min 20 characters")
    .max(200, "Product description max 200 characters"),
  size: z
    .array(z.enum(["Xl", "L", "M", "S", "XS"]))
    .min(1, { message: "At least one size must be selected" }),
  color: z.array(z.enum(["Purple", "Black", "Gold"])).min(1, "Select a color"),
  price: z
    .number()
    .min(1, "Product price must be at least 1")
    .max(9999, "Product price must be less than 9999"),
  product_inventory: z
    .number()
    .min(1, "Product inventory must be at least 1")
    .max(200, "Product inventory must be less than 200"),
});

interface ProductData {
  productName: string;
  description: string;
  size: string[];
  color: string[];
  price: number;
  product_inventory: number;
}

// Function for sanity Schema
const addProduct = async (productData: ProductData) => {
  const result = await client.create({
    _type: "product",
    productName: productData.productName,
    description: productData.description,
    size: productData.size,
    color: productData.color,
    price: productData.price,
    product_inventory: productData.product_inventory,
  });
  return result;
};

const ProductForm = () => {
  const [loading, setLoading] = useState(false); // Loader state
  const [successMessage, setSuccessMessage] = useState(""); // Success message state

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      description: "",
      size: [],
      price: 0,
      color: [],
      product_inventory: 0,
    },
  });

  const colors = [
    { label: "Purple", value: "Purple", hex: "#8B5CF6" },
    { label: "Black", value: "Black", hex: "#000000" },
    { label: "Gold", value: "Gold", hex: "#D4AF37" },
  ];

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true); // Start loader
    setSuccessMessage(""); // Clear any previous message

    try {
      await addProduct(values);
      setSuccessMessage("Your product has been uploaded successfully!");
    } catch (error: any) {
      console.error("Error adding product:", error.message);
      setSuccessMessage("Failed to upload product. Please try again.");
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-96">
        {/* Product Name Field */}
        <FormField
          control={form.control}
          name="productName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Product Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description Field */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Size Checkboxes Field */}
        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Size</FormLabel>
              <FormControl>
                <div className="flex items-center gap-5">
                  {["Xl", "L", "M", "S", "XS"].map((size) => (
                    <label key={size} className="block">
                      <Input
                        type="checkbox"
                        value={size}
                        checked={field.value.includes(size)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          const newValue = checked
                            ? [...field.value, size]
                            : field.value.filter((val) => val !== size);
                          field.onChange(newValue);
                        }}
                        className="form-checkbox"
                      />
                      <span className="ml-2">{size}</span>
                    </label>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Color Field */}
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <div className="flex items-center gap-5">
                  {colors.map((color) => (
                    <label
                      key={color.value}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Input
                        type="checkbox"
                        value={color.value}
                        checked={field.value.includes(color.value)}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          const newValue = checked
                            ? [...field.value, color.value]
                            : field.value.filter((val) => val !== color.value);
                          field.onChange(newValue);
                        }}
                        className="form-checkbox hidden"
                      />
                      <span
                        className={`w-10 h-10 rounded-full border-2 ${
                          field.value.includes(color.value)
                            ? "border-black p-5 border-4 rounded-full"
                            : "border-transparent"
                        }`}
                        style={{ backgroundColor: color.hex }}
                      ></span>
                    </label>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Price Field */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Price"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Inventory Field */}
        <FormField
          control={form.control}
          name="product_inventory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Inventory</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Inventory"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Loader or Submit Button */}
        {loading ? (
          <p className="text-center">Uploading your product...</p>
        ) : (
          <Button type="submit">Submit</Button>
        )}

        {/* Success Message */}
        {successMessage && (
          <p className="text-center text-green-600">{successMessage}</p>
        )}
      </form>
    </Form>
  );
};

export default ProductForm;
