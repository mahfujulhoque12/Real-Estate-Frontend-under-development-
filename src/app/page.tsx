"use client";

import { useEffect, useState } from "react";
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

export default function Page() {
  const [recentOffers, setRecentOffers] = useState<Listing[]>([]);
  const [rentListings, setRentListings] = useState<Listing[]>([]);
  const [saleListings, setSaleListings] = useState<Listing[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await api.get("/api/listing");
        const allListings: Listing[] = res.data;

        // Recent Offers
        const recent = allListings
          .filter((l) => l.offer && l.discountPrice)
          .sort((a, b) => new Date(b._id).getTime() - new Date(a._id).getTime())
          .slice(0, 8);

        // Rent
        const rent = allListings
          .filter((l) => l.type.toLowerCase() === "rent")
          .sort((a, b) => new Date(b._id).getTime() - new Date(a._id).getTime())
          .slice(0, 8);

        // Sale
        const sale = allListings
          .filter((l) => l.type.toLowerCase() === "sale")
          .sort((a, b) => new Date(b._id).getTime() - new Date(a._id).getTime())
          .slice(0, 8);

        setRecentOffers(recent);
        setRentListings(rent);
        setSaleListings(sale);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, []);

  return (
    <div>
      <Hero />
      <RecentOffer listings={recentOffers} />
      <ForRent listings={rentListings} />
      <ForSale listings={saleListings} />
    </div>
  );
}
