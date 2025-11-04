import Listing from "@/components/listing/Listing";
import PrivateRoute from "@/components/private-route/PrivateRoute";
import React from "react";

const page = () => {
  return (
    <PrivateRoute>
      <Listing />
    </PrivateRoute>
  );
};

export default page;
