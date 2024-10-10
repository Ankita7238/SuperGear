import React from 'react'
import { highlightsProducts } from '../../data/constants'
import Container from "./Container";
import { Link } from "react-router-dom";
import Title from './Title';

const Hightlights = () => {
  return (
    <>
    <Container>
        <div className="flex items-center justify-between">
          <Title text="Highlights and Offers" />
        </div>
        <div className="w-full h-[1px] bg-gray-200 mt-3" />
      </Container>
    <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
      {highlightsProducts.map((item) => (
        <div
          key={item?._id}
          className="relative h-44 rounded-lg shadow-md cursor-pointer overflow-hidden group"
        >
          <div
            className="absolute inset-0 bg-cover bg-center rounded-lg transition-transform duration-300 group-hover:scale-110"
            style={{
              backgroundImage: `url(${item?.image})`,
              color: item?.color,
            }}
          ></div>
          <div
            className="relative z-10 p-6 flex flex-col justify-between h-full"
            style={{ color: item?.color }}
          >
            <div>
              <h3 className="text-2xl font-bold max-w-44">{item?.name}</h3>
              <p className="text-base font-bold mt-4">{item?.title}</p>
            </div>
            <Link to={item?._base} className="text-base font-normal">
              {item?.buttonTitle}
            </Link>
          </div>
        </div>
      ))}
    </Container>
  </>
  );
};

export default Hightlights;