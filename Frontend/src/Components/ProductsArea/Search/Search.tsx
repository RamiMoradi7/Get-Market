import { Search as SearchIcon } from "@mui/icons-material";
import { Input, InputAdornment } from "@mui/material";
import React, { useState } from "react";
import "./Search.css";

interface SearchProps {
  onSearch: (query: string) => void;
}

function SearchProducts({ onSearch }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div style={{ margin: "20px", display: "flex", justifyContent: "center" }}>
      <Input
        type="search"
        placeholder="Search products..."
        value={searchQuery}
        onChange={handleSearchChange}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        className="search-input"
      />
    </div>
  );
}

export default SearchProducts;
