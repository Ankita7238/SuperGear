import React, { useEffect, useState } from "react";
import Container from "./Container";
import Title from "./Title";
import { Link } from "react-router-dom";
import { categories } from "../../data/constants";

const Categories = () => {

  return (
    <Container>
      <div className="mb-10">
        <div className="flex items-center justify-between">
          <Title text="Popular Categories" />
          <Link
            to={"/category/tvAndAudio"}
            className=" relative group overflow-hidden "
          >
            View All Categories{" "}
            <span className="absolute bottom-0 left-0 w-full block h-[1px] bg-gray-600 -translate-x-[100%] group-hover:translate-x-0 duration-300" />
          </Link>
        </div>
        <div className="w-full h-[1px] bg-gray-200 mt-3" />
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-7 " >
        {categories.map((item) => (
          <Link
            to={`/category/${item?._base}`}
            key={item?._id}
            className="w-full relative group overflow-hidden  bg-gray-100 p-2"
          >
            <img
              src={item?.image}
              alt="categoryImage"
              className=" overflow-hidden w-full rounded-md group-hover:scale-110 duration-300 "
            />
            <div className="relative bottom-1 md:bottom-3 w-full text-center">
              <p className="text-sm md:font-bold font-medium">{item?.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default Categories;