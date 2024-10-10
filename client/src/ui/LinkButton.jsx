import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const LinkButton = ({ showButton, link, className }) => {
  const newClassName = twMerge(
    "bg-darkText/80 hover:bg-darkText text-whiteText py-2.5 px-6 rounded-full flex items-center gap-2 duration-200",
    className
  );
  return (
    <Link to={link ? link : "/products"} className={newClassName}>
       Start Shopping{showButton && <FaArrowRight />}
    </Link>
  );
};

export default LinkButton;
