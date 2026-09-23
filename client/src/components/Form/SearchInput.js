import React from "react";
import { useSearch } from "../../context/Search";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/SearchInputStyles.css";

const SearchInput = () => {
  const [search, setSearch] = useSearch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = async (e) => {
    e.preventDefault();
    const keyword = search.keyword.trim();
    if (!keyword) return;

      // ✅ Avoid redundant navigation
      const currentQuery = new URLSearchParams(location.search).get("keyword");
      if (currentQuery !== keyword) {
        navigate(`/search?keyword=${keyword}`);
      }
  };

  return (
    <form className="d-flex" role="search" onSubmit={handleSearch}>
      <div
        className="daraz-search-bar"
        style={{ position: "relative", width: "100%", minWidth: "250px" }}
      >
        <div className="search-input-container p-0 m-0">
          <input
            className="form-control"
            type="search"
            placeholder="Search in Daraz"
            aria-label="Search"
            value={search.keyword}
            onChange={(e) =>
              setSearch({ ...search, keyword: e.target.value })
            }
            style={{
              paddingRight: "45px",
              height: "43px",
            }}
          />
          <button
            className="search-button-icon"
            type="submit"
            style={{
              width: "43px",
              height: "43px",
              position: "absolute",
              top: "0",
              right: "0",
              border: "none",
              borderRadius: "0 4px 4px 0",
              backgroundColor: "#ffe1d2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SearchIcon />
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchInput;
