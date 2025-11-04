export interface Listing {
  _id?: string;
  name: string;
  description: string;
  address: string;
  regularPrice: number;
  discountPrice: number;
  bathroom: number;
  bedroom: number;
  furnished: boolean;
  parking: boolean;
  type: "rent" | "sale";
  offer: boolean;
  imageUrls: string[];
  uerRef: string;
  createdAt?: string;
  updatedAt?: string;
}
