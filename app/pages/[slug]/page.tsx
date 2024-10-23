import { getPageBySlug } from "@/lib/wordpress";
import { Section, Container } from "@/components/craft";
import { Metadata } from "next";
import BackButton from "@/components/back";

// Sample structured data (JSON-LD) for a product
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: "Hello Product", // Update with actual product name
  image: "https://example.com/image.jpg", // Update with actual image URL
  description: "Description of the hello product.", // Update with actual product description
  // You can add more properties as needed
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const page = await getPageBySlug(params.slug);

  return {
    title: "hello world",
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const page = await getPageBySlug(params.slug);

  return (
    <Section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Container>
        <BackButton />
        <h1 className="pt-12">{page.title.rendered}</h1>
        <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
      </Container>
    </Section>
  );
}
