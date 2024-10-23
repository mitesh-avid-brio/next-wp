// ProductTabs.tsx
'use client';

export const Tabs = ({ children, defaultValue }) => {
  return (
    <div className="tabs" data-default-value={defaultValue}>
      {children}
    </div>
  );
};

export const TabsList = ({ children, className }) => {
  return (
    <div className={`flex space-x-4 ${className}`}>
      {children}
    </div>
  );
};

export const TabsTrigger = ({ value, children }) => {
  return (
    <button className="tab-trigger p-2 hover:bg-gray-200 rounded">
      {children}
    </button>
  );
};

export const TabsContent = ({ value, children }) => {
  return (
    <div className={`tab-content mt-4`}>
      {children}
    </div>
  );
};

const Card = ({ children }) => {
  return (
    <div className="border rounded-lg shadow-md p-4">
      {children}
    </div>
  );
};

const CardContent = ({ children }) => {
  return (
    <div className="card-content">
      {children}
    </div>
  );
};

export default function ProductTabs({ product }) {
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
