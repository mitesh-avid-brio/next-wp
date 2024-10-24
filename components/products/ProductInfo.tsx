'use client';

import { useState } from 'react';
import { ShoppingCart, Heart, Share2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/store/store";
import { addProduct } from "@/store/slices/cartSlice"; // Import the actions

// Updated CartItem interface to include all product details
export interface CartItem {
  id: number; // or string if it's a string ID
  name: string;
  price: number; // Current price of the product
  description?: string; // Optional property
  images: { src: string; alt: string }[]; // Array of images
  short_description: string; // Short description of the product
  quantity: number; // Quantity of the product
}

interface Product {
  id: number; // or string if it's a string ID
  name: string;
  price: number; // or whatever type your price is
  description?: string; // optional property
  images: { src: string; alt: string }[]; // Example for images, adjust as necessary
  short_description: string;
}

interface ProductInfoProps {
  product: Product; // Use the Product type
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch(); // Initialize dispatch
  
  const handleAddToCart = () => {
    console.log("clicked");
    
    // Create the complete CartItem with all details
    const itemToAdd: CartItem = {
      id: product.id, // Use the actual product ID
      name: product.name, // Include product name
      price: product.price, // Include current price
      description: product.description, // Include description (optional)
      images: product.images, // Include images array
      short_description: product.short_description, // Include short description
      quantity: quantity, // Use the selected quantity
    };

    console.log(itemToAdd);
    dispatch(addProduct(itemToAdd)); // Dispatch the addProduct action with the complete itemToAdd
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <div className="flex items-center gap-4">
          <span className="text-2xl font-semibold">${product.price}</span>
          {/* {product.regular_price !== product.price && (
            <span className="text-lg text-gray-500 line-through">
              ${product.regular_price}
            </span>
          )} */}
        </div>
      </div>

      <div className="text-gray-600">
        <div dangerouslySetInnerHTML={{ __html: product.short_description }} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Quantity</label>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            -
          </Button>
          <span className="w-12 text-center">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <Button className="w-full h-12 text-lg" onClick={handleAddToCart}>
          <ShoppingCart className="w-5 h-5 mr-2" />
          Add to Cart
        </Button>
        
        <div className="flex gap-4">
          <Button variant="outline" className="flex-1">
            <Heart className="w-5 h-5 mr-2" />
            Save
          </Button>
          <Button variant="outline" className="flex-1">
            <Share2 className="w-5 h-5 mr-2" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}
