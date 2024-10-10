import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { products } from "../../data/constants"; // Import products data
import { categories } from "../../data/constants"; // Import categories data
import Loading from "../ui/Loading";
import Container from "../ui/Container";
import CategoryFilters from "../ui/CategoryFilters";
import ProductCard from "../ui/ProductCard";

const Category = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const fetchData = () => {
      try {
        // Find the category by id
        const category = categories.find(cat => cat._base === id);

        if (category) {
          setCategoryName(category.name);
          // Filter products based on the category
          const filtered = products.filter(product => product.category === category.name);
          setFilteredProducts(filtered);
        } else {
          console.error("Category not found");
        }
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const formatId = (id) => {
    return id
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/(^\w|\s\w)/g, (match) => match.toUpperCase());
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <h2 className="text-4xl text-center font-semibold mb-5">
            {formatId(categoryName)}
          </h2>
          <div className="flex items-start gap-10">
            <CategoryFilters id={id} />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredProducts.map((item) => (
                <ProductCard item={item} key={item._id} />
              ))}
            </div>
          </div>
        </Container>
      )}
    </div>
  );
};

export default Category;
