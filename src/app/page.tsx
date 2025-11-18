// app/page.tsx
import ForRent from "@/components/home/ForRent";
import ForSale from "@/components/home/ForSale";
import Hero from "@/components/home/Hero";
import RecentOffer from "@/components/home/RecentOffer";
import { BASE_URL } from "@/constant/Constant";

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
    const res = await fetch(`${BASE_URL}/api/listing`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch listings");
    }

    const allListings: Listing[] = await res.json();

    const offers = allListings
      .filter((listing) => listing.offer && listing.discountPrice)
      .sort((a, b) => new Date(b._id).getTime() - new Date(a._id).getTime())
      .slice(0, 8);

    return offers;
  } catch (error) {
    console.error("Error fetching recent offers:", error);
    return [];
  }
};

const getRentListings = async (): Promise<Listing[]> => {
  try {
    const res = await fetch(`${BASE_URL}/api/listing`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch listings");
    }

    const allListings: Listing[] = await res.json();

    const rentListings = allListings
      .filter((listing) => listing.type.toLowerCase() === "rent")
      .sort((a, b) => new Date(b._id).getTime() - new Date(a._id).getTime())
      .slice(0, 8);

    return rentListings;
  } catch (error) {
    console.error("Error fetching rent listings:", error);
    return [];
  }
};

const getSaleListings = async (): Promise<Listing[]> => {
  try {
    const res = await fetch(`${BASE_URL}/api/listing`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch listings");
    }

    const allListings: Listing[] = await res.json();

    const saleListings = allListings
      .filter((listing) => listing.type.toLowerCase() === "sale")
      .sort((a, b) => new Date(b._id).getTime() - new Date(a._id).getTime())
      .slice(0, 8);

    return saleListings;
  } catch (error) {
    console.error("Error fetching sale listings:", error);
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
