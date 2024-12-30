import { ImagesSlider } from "@/app/Components/ImageSlider";
import PageTitle from "@/app/Components/pageTitle"; // Ensure correct import if it's a default export
import prisma from "@/lib/prisma";
import { Card } from "@nextui-org/react";
import { motion } from "framer-motion"; // Corrected framer-motion import

interface Props {
  params: {
    id: string;
  };
}

const PropertyPage = async ({ params }: Props) => {
  const id = parseInt(params?.id ?? "0", 10); // Safely handle the dynamic id
  if (isNaN(id) || id <= 0) {
    return {
      notFound: true,
    };
  }

  const property = await prisma.property.findUnique({
    where: {
      id,
    },
    include: {
      status: true,
      type: true,
      feature: true,
      location: true,
      contact: true,
      images: true,
    },
  });

  if (!property) {
    return {
      notFound: true,
    };
  }

  return (
    <div>
      <PageTitle title="Property Pages" href="/" linkCaptions="Back to Properties" />
      <div className="p-4">
        <h2 className="text-2xl font-bold text-primary my-5">{property.name}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="col-span-2">
            <ImagesSlider images={property.images.map((img) => img.url)}>{null}</ImagesSlider>
            <h2 className="text-2xl font-bold text-gray-700 mt-7">
              ${property.price} / {property.status.value}
            </h2>
            <p className="text-sm text-gray-600 mt-7">{property.description}</p>
          </div>
          <Card className="p-5 flex flex-col gap-1">
            <Title title="Features" className="mt-0" />
            <Attribute label="Bedrooms" value={property.feature?.bedrooms} />
            <Attribute label="Bathrooms" value={property.feature?.bathrooms} />
            <Attribute label="Parking Slots" value={property.feature?.parkingSpots} />
            <Attribute label="Area" value={property.feature?.area} />

            <Title title="Address" className="mt-7" />
            <Attribute label="City" value={property.location?.city} />
            <Attribute label="Landmark" value={property.location?.landmark} />
            <Attribute label="Postal Code" value={property.location?.zip} />
            <Attribute label="Address" value={property.location?.streetAddress} />

            <Title title="Owner Details" className="mt-7" />
            <Attribute label="Owner Name" value={property.contact?.name} />
            <Attribute label="Email" value={property.contact?.email} />
            <Attribute label="Phone" value={property.contact?.phone} />
          </Card>
        </div>
      </div>
    </div>
  );
};

const Title = ({ title, className }: { title: string; className: string }) => (
  <div className={className}>
    <h2 className="text-xl font-bold text-slate-700">{title}</h2>
    <hr className="border border-solid border-slate-300" />
  </div>
);

const Attribute = ({ label, value }: { label: string; value?: string | number }) => (
  <div className="flex justify-between">
    <p className="text-sm text-slate-600">{label}</p>
    <p className="text-sm text-slate-600">{value}</p>
  </div>
);

export default PropertyPage;
