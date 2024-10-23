import { getAllPages } from "@/lib/wordpress";
import { Section, Container } from "@/components/craft";
import Link from "next/link";

export default async function Page() {
  const pages = await getAllPages();

  return (
    <Section>
      <Container>
        <h1>Pages</h1>

        <h2>All Pages</h2>
        <div className="grid">
        
        </div>
      </Container>
    </Section>
  );
}
