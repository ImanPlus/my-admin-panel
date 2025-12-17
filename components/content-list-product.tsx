"use client";

import { useState } from "react";
import ContentProductActions from "./content-product-actions";

export default function ContentListProduct() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div>
      <ContentProductActions
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
     
      
    </div>
  );
}
