import { Section, Container } from "@/components/craft";
import BackButton from "@/components/back";
import { fetchProductById } from "@/lib/api";
import ProductGallery from '@/components/products/ProductGallery';
import ProductInfo from '@/components/products/ProductInfo';
import ProductTabs from '@/components/products/ProductTabs';

export default async function Page({ params }: { params: { slug: string } }) {
  const product = await fetchProductById(params.slug);
  
  return (
    <Section className="py-8">
      <Container>
        <div className="mb-6">
          <BackButton />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <ProductGallery images={product.images} name={product.name} />
          <ProductInfo product={product} />
        </div>

        <ProductTabs product={product} />
      </Container>
    </Section>
  );
}