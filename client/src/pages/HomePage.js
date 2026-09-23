import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import "../styles/HomePage.css";
import axios from "../components/Utils/AxiosConfig";
import { Link } from "react-router-dom";
import ImageSlider from "../components/M-Designs/ImageSlider";
import useRandomSubcategories from "../hooks/useRandomSubcategories";
import FlashSaleCard from "../components/M-Designs/FlashSaleCard";
import CategoryCard from "../components/M-Designs/CategoryCard";
import JustForYouCard from "../components/M-Designs/JustForYouCard";
import SideBarNav from "../components/M-Designs/SideBarNav";

const slides = [
  {
    url: "http://localhost:3000/images/slider/slider-image1.jpg",
    title: "Contact",
  },
  {
    url: "http://localhost:3000/images/slider/slider-image2.jpg",
    title: "ContactUs",
  },
  {
    url: "http://localhost:3000/images/slider/slider-image3.jpg",
    title: "About",
  },
  {
    url: "http://localhost:3000/images/slider/slider-image4.jpg",
    title: "Banner",
  },
  {
    url: "http://localhost:3000/images/slider/slider-image5.jpg",
    title: "Banner",
  },
  {
    url: "http://localhost:3000/images/slider/slider-image6.jpg",
    title: "Banner",
  },
  {
    url: "http://localhost:3000/images/slider/slider-image7.jpg",
    title: "Banner",
  },
];
const HomePage = () => {
  const subCategories = useRandomSubcategories(16) || [];
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
      sessionStorage.setItem("randomProducts", JSON.stringify(data.products));
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const saved = sessionStorage.getItem("randomProducts");
    if (saved) {
      setProducts(JSON.parse(saved));
      return;
    }
    getAllProducts();
  }, []);
  // getTotal Count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTotal();
  }, [total]);

  // LOAD MORE
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/list/${page}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  return (
    <Layout title={"All Products - Best offers"}>
      <div className="main-wrapper">
        {/* Image Slider */}
        <div className="slider-wrapper">
          <ImageSlider slides={slides} />
          <div>
            <img src="/images/slider/try-daraz-app.png" alt="daraz logo" />
          </div>
        </div>
        <div className="section-wrapper">
          {/* flash sale section */}
          <section id="flash-sale-section">
            <div className="section-headers">
              <h5>Flash Sale</h5>
            </div>

            <div>
              <div className="on-sale-now-wrapper">
                <span>On Sale Now</span>
                <button className="btn btn-outline-danger">
                  SHOP ALL PRODUCTS
                </button>
              </div>
            </div>
            <hr />
            <div className="row g-0 bg-white">
              <div className="col-md-12 mt-3 min-vh-105">
                <div className="flash-sale-card-area">
                  {products.slice(0, 12).map((product) => (
                    <Link
                      key={product._id}
                      to={`/product/${product._id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <FlashSaleCard {...product} />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* category section */}
          <section id="categories-section">
            <div className="section-headers ">
              <h5>Categories</h5>
            </div>

            <div className="category-card">
              {subCategories?.map((category) => (
                <Link
                  to={`/search?subcategory=${category._id}`}
                  key={category._id}
                >
                  <CategoryCard {...category} />
                </Link>
              ))}
            </div>
          </section>

          {/* just for you section */}
          <section id="justforyou-section">
            <div className="section-headers">
              <h5>Just For You</h5>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="just-for-you-wrapper">
                  {products?.slice(0, page * 24).map((product) => (
                    <Link
                      to={`/product/${product._id}`}
                      key={product._id}
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                      }}
                    >
                      <JustForYouCard
                        {...product}
                        rating={product.rating || 4.2}
                      />
                    </Link>
                  ))}
                </div>

                {/* Load More Button */}
                <div className="m-2 p-3 text-center">
                  {products && products.length < total && (
                    <button
                      style={{ width: "250px" }}
                      className="btn btn-outline-danger"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(page + 1);
                      }}
                    >
                      {loading ? "Loading..." : "Load More"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <SideBarNav />
    </Layout>
  );
};

export default HomePage;
