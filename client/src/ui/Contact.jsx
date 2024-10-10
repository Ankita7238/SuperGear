import React from 'react'
import { TiSocialFacebook, TiSocialInstagram, TiSocialYoutube } from "react-icons/ti";
import { SlSocialPintarest } from "react-icons/sl";


const Contact = () => {
  return (
    <div className='flex justify-center bg-red-500 p-2 '>
			<div className='flex flex-col items-center justify-between gap-4 md:flex-row md:gap-8 py-2'>
				<span>STAY IN TOUCH WITH US:</span>
				<div>
					<input
						type='text'
						placeholder='Enter your e-mail...'
						className='rounded-l-lg p-3 w-80'
					/>
					<button className='rounded-r-lg bg-gray-700 p-3 text-white'>
						JOIN US
					</button>
				</div>
				<div className='flex items-center text-2xl gap-1'>
                <TiSocialFacebook />
                <TiSocialInstagram/>
                <TiSocialYoutube/>
                <SlSocialPintarest/> 
				</div>
			</div>
		</div>
  )
}

export default Contact