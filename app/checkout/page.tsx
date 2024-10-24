"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import { ICartState, CartItem } from "@/store/slices/cartSlice"; // Import the CartItem interface
import { getAllPaymentInfo } from "@/lib/wordpress";

export default function Checkout() {
  // Fetch cart items from the Redux store
  const cartItems: CartItem[] = useSelector(
    (state: { cart: ICartState }) => state.cart.items
  );

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    email: "",
    address: "",
  });

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Calculate the subtotal and total
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingCost = 5.0; // Example shipping cost

  console.log("cartItems", cartItems);
  const total = subtotal + shippingCost;


 const data = getAllPaymentInfo()

  return (
    <div className="container mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left: Product Information */}
        <div className="space-y-6">
          <div className="p-6 bg-gray-100 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Product Information</h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="mb-4">
                  {item.images ? (
                    <img
                      src={item?.images[0]?.src}
                      alt={item.images[0]?.alt}
                      className="w-full h-auto rounded"
                    />
                  ) : null}
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p className="text-lg text-gray-500">
                    <span className="line-through">${item.price}</span>{" "}
                    <span className="text-red-500">${item.price}</span>
                  </p>
                  <div
                    dangerouslySetInnerHTML={{ __html: item.short_description }}
                    className="text-gray-700"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Shipping and Order Summary */}
        <div className="space-y-6">
          <div className="p-6 bg-gray-100 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">
              Shipping Information
            </h2>
            <div className="space-y-4">
              <Input
                placeholder="Name"
                name="name"
                value={shippingInfo.name}
                onChange={handleShippingChange}
              />
              <Input
                placeholder="Email"
                name="email"
                type="email"
                value={shippingInfo.email}
                onChange={handleShippingChange}
              />
              <Input
                placeholder="Address"
                name="address"
                value={shippingInfo.address}
                onChange={handleShippingChange}
              />
            </div>
          </div>

          <div className="p-6 bg-gray-100 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <Button className="w-full h-12 text-lg">Proceed to Payment</Button>
        </div>
      </div>
    </div>
  );
}
