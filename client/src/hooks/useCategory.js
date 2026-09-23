import { useState, useEffect } from "react";
import axios from "../components/Utils/AxiosConfig";
export default function useCategory() {
  const [categories, setCategories] = useState([]);

  // get category
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-categories`
      );
      setCategories(data?.categories || []);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  return { categories, setCategories, getCategories };
}
