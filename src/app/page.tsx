import ForRent from "@/components/home/ForRent";
import ForSale from "@/components/home/ForSale";
import Hero from "@/components/home/Hero";
import RecentOffer from "@/components/home/RecentOffer";
import { api } from "@/lib/axios";

interface Listing {
  _id: string;
  name: string;
  description: string;
  address: string;
  regularPrice: number;
  discountPrice?: number;
  bathroom: number;
  bedroom: number;
  furnished: boolean;
  parking: boolean;
  type: string;
  offer: boolean;
  imageUrls: string[];
}

const getRecentOffers = async (): Promise<Listing[]> => {
  try {
    const res = await api.get("/api/listing");

    const allListings: Listing[] = res.data;

    return allListings
      .filter((listing) => listing.offer && listing.discountPrice)
      .sort((a, b) => new Date(b._id).getTime() - new Date(a._id).getTime())
      .slice(0, 8);
  } catch (error) {
    console.error("Recent offers fetch failed:", error);
    return [];
  }
};

const getRentListings = async (): Promise<Listing[]> => {
  try {
    const res = await api.get("/api/listing");
    const allListings: Listing[] = res.data;

    return allListings
      .filter((listing) => listing.type.toLowerCase() === "rent")
      .sort((a, b) => new Date(b._id).getTime() - new Date(a._id).getTime())
      .slice(0, 8);
  } catch (error) {
    console.error("Rent listings fetch failed:", error);
    return [];
  }
};

const getSaleListings = async (): Promise<Listing[]> => {
  try {
    const res = await api.get("/api/listing");
    const allListings: Listing[] = res.data;

    return allListings
      .filter((listing) => listing.type.toLowerCase() === "sale")
      .sort((a, b) => new Date(b._id).getTime() - new Date(a._id).getTime())
      .slice(0, 8);
  } catch (error) {
    console.error("Sale listings fetch failed:", error);
    return [];
  }
};

const Page = async () => {
  const recentOffers = await getRecentOffers();
  const rentListings = await getRentListings();
  const saleListings = await getSaleListings();

  return (
    <div>
      <Hero />
      <RecentOffer listings={recentOffers} />
      <ForRent listings={rentListings} />
      <ForSale listings={saleListings} />
    </div>
  );
};

export default Page;
