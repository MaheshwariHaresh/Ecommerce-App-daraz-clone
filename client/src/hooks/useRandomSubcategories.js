// hooks/useRandomSubCategories.js
import { useState, useEffect } from "react";
import useCategory from "./useCategory";

const useRandomSubCategories = (limit) => {
  const { categories } = useCategory() || {};
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    if (!categories || categories.length === 0) return;

    const navEntry = performance.getEntriesByType("navigation")[0];
    if (navEntry?.type === "reload")
      sessionStorage.removeItem("randomSubcategories");

    const saved = sessionStorage.getItem("randomSubcategories");
    if (saved) {
      setSubCategories(JSON.parse(saved));
      return;
    }

    const allSubs = categories.flatMap((cat) => cat.subCategories);
    const shuffled = [...allSubs].sort(() => 0.5 - Math.random());
    const selected = limit ? shuffled.slice(0, limit) : shuffled;

    sessionStorage.setItem("randomSubcategories", JSON.stringify(selected));
    setSubCategories(selected);
  }, [categories, limit]);

  return subCategories;
};

export default useRandomSubCategories;
