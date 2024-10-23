import { Section, Container } from "@/components/craft";
import { fetchProducts } from "@/lib/api";
import Link from "next/link";

export default async function Page() {
  const Products = await fetchProducts();

  console.log("Products",Products[0].images[0].src)

  return (
    <Section>
      <Container>
        <h1 className="text-4xl font-bold mb-10 text-center">Products</h1>

        <h2 className="text-3xl font-semibold mb-8 text-center">All Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Products.map((product: any) => (
            <Link key={product.id} href={`shop/${product.id}`} className="block p-4 border rounded-lg hover:shadow-lg transition">
              <div className="relative mb-4">
                <img
                  src={product.images[0].src} // Make sure your product object contains the image URL
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2">Price: <span className="font-bold">${product.price}</span></p>
              <p className="text-sm text-gray-600">{product.description}</p>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
