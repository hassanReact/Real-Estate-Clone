import prisma from "@/lib/prisma";
import PropertyCard from "./Components/PropertyCard";
import PropertyContainer from "./Components/PropertyContainer";
import Search from "./Components/Search";

const PAGE_SIZE = 12;

interface Props {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function Home({ searchParams }: Props) {
  // Safely parse searchParams
  const pagenum = Number(searchParams?.pagenum) || 0; // Defaults to 0 if not provided
  const query = searchParams?.query ? String(searchParams.query) : ""; // Defaults to an empty string

  // Fetch properties and total count in parallel
  const propertiesPromise = prisma.property.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      images: {
        select: {
          url: true,
        },
      },
      location: {
        select: {
          city: true,
          state: true,
        },
      },
    },
    ...(query && {
      where: {
        name: {
          contains: query,
        },
      },
    }),
    skip: pagenum * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  const totalPropertiesPromise = prisma.property.count({
    ...(query && {
      where: {
        name: {
          contains: query,
        },
      },
    }),
  });

  const [properties, totalProperties] = await Promise.all([
    propertiesPromise,
    totalPropertiesPromise,
  ]);

  // Calculate total pages
  const totalPages = Math.ceil(totalProperties / PAGE_SIZE); // Use `Math.ceil` for proper pagination

  return (
    <>
      <Search />
      <PropertyContainer totalPages={totalPages} currentPage={pagenum}>
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </PropertyContainer>
    </>
  );
}
