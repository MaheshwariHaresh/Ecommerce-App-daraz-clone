import React, { useEffect, useState } from "react";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import useRandomSubCategories from "../hooks/useRandomSubcategories";
import Layout from "../components/Layout/Layout";
import SearchResultCard from "../components/M-Designs/SearchResultCard";
import "../styles/SearchPage.css";
import { Link, useLocation } from "react-router-dom";
import axios from "../components/Utils/AxiosConfig";

const SearchPage = () => {
  const [sort, setSort] = useState("1");
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const subCategories = useRandomSubCategories() || [];
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [filters, setFilters] = useState({});
  const location = useLocation();

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      const params = new URLSearchParams(location.search);
      const keyword = params.get("keyword");
      const category = params.get("category");
      const subcategory = params.get("subcategory");

      if (!keyword && !category && !subcategory) return;

      try {
        const { data } = await axios.get(`/api/v1/product/search?${params}`);
        if (data?.success) {
          setProducts(data.products);
          setAllProducts(data.products); // store original products
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, [location.search]);

  const handleSort = (value) => {
    setSort(value);
    let sorted = [...products];
    if (value === "2") sorted.sort((a, b) => a.price - b.price);
    else if (value === "3") sorted.sort((a, b) => b.price - a.price);
    else if (value === "1") {
      setProducts(allProducts);
      return;
    }
    setProducts(sorted);
  };

  const handlePriceFilter = () => {
    if (minPrice && maxPrice) {
      const filtered = allProducts.filter(
        (p) => p.price >= minPrice && p.price <= maxPrice
      );
      setProducts(filtered);
      setFilters({ price: `${minPrice}-${maxPrice}` });
    } else {
      setProducts(allProducts);
      setFilters({});
    }
  };

  const clearPriceFilter = () => {
    setMinPrice(null);
    setMaxPrice(null);
    setProducts(allProducts);
    setFilters({});
  };

  return (
    <Layout title="Search results">
      <div className="search-wrapper">
        <div className="search-page">
          <aside className="sidebar">
            <h3 className="filter-title">Category</h3>
            <ul>
              {subCategories?.map((category) => (
                <li key={category._id}>
                  <Link
                    to={`/search?subcategory=${category._id}`}
                    className="category-filter-item"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="price-filter-row">
              <p className="price-title">Price</p>
              <div className="price-input-group">
                <input
                  className="price-input"
                  type="number"
                  placeholder="Min"
                  value={minPrice || ""}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <span className="price-dash">-</span>
                <input
                  className="price-input"
                  type="number"
                  placeholder="Max"
                  value={maxPrice || ""}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
                <button className="price-btn" onClick={handlePriceFilter}>
                  <ArrowRightIcon />
                </button>
              </div>
            </div>
          </aside>

          <main className="results-section">
            <div className="results-header">
              <div>
                <h4>Search Results</h4>
                <p>
                  {products.length < 1
                    ? "No Products Found"
                    : `${products.length} items found`}
                </p>

                {/* Filtered By Section */}
                {filters.price && (
                  <div className="filtered-by">
                    Filtered By: <span>Price: {filters.price}</span>{" "}
                    <button className="clear-filter" onClick={clearPriceFilter}>
                      Clear
                    </button>
                  </div>
                )}
              </div>

              <div className="sort-section">
                <label htmlFor="sort" className="sort-label">
                  Sort By:
                </label>
                <select
                  id="sort"
                  className="sort-select"
                  value={sort}
                  onChange={(e) => handleSort(e.target.value)}
                >
                  <option value="1">Best Match</option>
                  <option value="2">Price: Low to High</option>
                  <option value="3">Price: High to Low</option>
                </select>
              </div>
            </div>

            <div className="products-grid">
              {products?.map((product) => (
                <Link
                  key={product._id}
                  to={`/product/${product._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <SearchResultCard
                    image={product.image}
                    title={product.name}
                    description={product.description?.substring(0, 40)}
                    price={product.price}
                    discount={product.oldPrice || 10}
                    rating={product.rating || 4.2}
                  />
                </Link>
              ))}
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
