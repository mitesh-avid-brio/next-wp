// ProductTabs.tsx
'use client';

import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@radix-ui/react-tabs'; // Adjust according to your tab component library
import { Card } from './Card'; // Adjust the import path for your Card components
import { CardContent } from './CardContent'; // Adjust the import path for your Card components

interface ProductTabsProps {
  product: {
    description: string;
    attributes?: Array<{
      id: string;
      name: string;
      options?: Array<{
        id: string;
        name: string;
      }>;
    }>;
  };
}

export default function ProductTabs({ product }: ProductTabsProps) {
  return (
    <Tabs defaultValue="description" className="mt-12">
      <TabsList className="w-full justify-start border-b">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="specifications">Specifications</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="mt-6">
        <Card>
          <CardContent className="pt-6">
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="specifications" className="mt-6">
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-2 gap-4">
              {product.attributes && product.attributes.map(attribute => (
                <div key={attribute.id} className="border-b pb-2">
                  <span className="font-medium">{attribute.name}:</span>
                  {attribute.options && (
                    <ul className="list-disc pl-4">
                      {attribute.options.map(option => (
                        <li key={option.id}>{option.name}</li> // Adjust to the correct property
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="reviews" className="mt-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-gray-500">No reviews yet.</p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
