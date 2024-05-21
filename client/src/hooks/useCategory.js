import { useEffect, useState } from "react";
import axios from "axios";

// aa useCategory() function ne je-te component ma import karsu...
export default function useCategory() {
  const [categories, setCategories] = useState([]); //   ane aa categories state-varible ne tya use kari sakase/ GET kari sakase

  //get Categories
  const getCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}
