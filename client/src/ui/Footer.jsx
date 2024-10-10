import React from "react";
import Container from "./Container";
import Contact from "./Contact";
import FooterTop from "./FooterTop";

const Footer = () => {
  return (
    <div className="mt-3 bg-[#f6f6f6]">
   
    <FooterTop />
    <Contact/>
    <Container className="flex items-center justify-center">
    <div className='mb-5 mt-5 px-8 md:mx-8 xl:mx-48 xl:px-0'>
			{/* top */}
			<div className='flex flex-wrap gap-12 md:flex-row md:flex-nowrap '>
				<div className='flex flex-1 flex-col gap-2 text-justify text-sm'>
					<h1 className='text-bold text-lg text-gray-600'>Categories</h1>
          <div className='text-gray-500 mt-1'>
          <div>category name</div>
          <div>category name</div>
          <div>category name</div>
          <div>category name</div>
          <div>category name</div>
					</div>
				
				</div>
				<div className='flex flex-1 flex-col gap-2 text-justify text-sm'>
					<h1 className='text-bold text-lg text-gray-600'>Links</h1>
					<span className='text-gray-500'>FAQ</span>
					<span className='text-gray-500'>Pages</span>
					<span className='text-gray-500'>Stores</span>
					<span className='text-gray-500'>Compare</span>
					<span className='text-gray-500'>Cookies</span>
				</div>
				<div className='flex flex-col gap-2 text-justify text-sm md:flex-1'>
					<h1 className='text-bold text-lg text-gray-600'>About</h1>
					<span className='text-gray-500'>
						Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do
						eiusmod tempor incididunt ut labore et dolore. Lorem ipsum dolor sit
						amet conse ctetur adipisicing elit, seddo eiusmod tempor incididunt
						ut labore etdolore.
					</span>
				</div>
				<div className='flex flex-col gap-2 text-justify text-sm md:flex-1'>
					<h1 className='text-bold text-lg text-gray-600'>Contact</h1>
					<span className='text-gray-500'>
						Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do
						eiusmod tempor incididunt ut labore et dolore. Lorem ipsum dolor sit
						amet conse ctetur adipisicing elit, seddo eiusmod tempor incididunt
						ut labore etdolore.
					</span>
				</div>
			</div>
			{/* bottom */}
			<div className='mt-5 flex flex-col items-center justify-between sm:flex-row'>
				{/* left */}
				<div className='flex flex-col items-center sm:items-start md:flex-row md:items-center'>
					<span className='text-2xl font-bold text-red-500'>SuperGear</span>
					<span className='ml-5 text-xs text-gray-500 sm:ml-0 md:ml-5'>
						© Copyright 2024. All Rights Reserved
					</span>
				</div>
				{/* right */}
				<div>
					
				</div>
			</div>
		</div>
      </Container>
    </div>
  );
};

export default Footer;