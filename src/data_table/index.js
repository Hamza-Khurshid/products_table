import React, { useEffect } from "react";
import Table from "./table";

export default function ProductsTable() {
  const [loading, setLoading] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [columns] = React.useState([
    "title",
    "id",
    "price",
    "discountPercentage",
    "discountPrice",
    "category",
  ]);

  const calculateDiscountPrice = (price, discountPercentage) => {
    return Number((price - (price * discountPercentage) / 100).toFixed(2));
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      if (data?.products?.length > 0) {
        const products = data.products.map((product) => {
          return {
            ...product,
            discountPrice: calculateDiscountPrice(
              product.price,
              product.discountPercentage
            ),
          };
        });

        setProducts(products || []);
      }
    } catch (error) {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return <Table cols={columns} rows={products} isLoading={loading} />;
}
