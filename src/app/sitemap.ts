import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}sitemap`, {
      cache: "no-store",
    });
    const data = await response.json();

    const slugs = data.slugs;

    const fields =
      data &&
      slugs.map((slug: any) => ({
        url: process.env.NEXT_PUBLIC_BASE_URL + slug.slug,
        lastModified: new Date().toISOString(),
      }));
    return fields;
  } catch (e) {
    return [
      {
        url: "https://appointify.in",
        lastModified: new Date(),
      },
    ];
  }
}
