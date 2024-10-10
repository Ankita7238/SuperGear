import { homeBanner } from "../assets";
import Container from "./Container";
import LinkButton from "./LinkButton";

const HomeBanner = () => {
  return (
    <Container className="relative md:py-3  overflow-hidden">
      <div className="relative">
        <img
          src={homeBanner}
          alt="homeBanner"
          className=" w-full md:min-h-full min-h-80 mx-auto md:object-contain object-cover rounded-md"
        />
      </div>
      <div className="absolute inset-0  md:left-36 left-12 flex flex-col justify-center lg:px-10 px-2 z-10">
        <h2 className="relative  text-md md:text-3xl lg:text-6xl text-whiteText font-bold">
          Mi Air Purifier
        </h2>
        <p className="relative text-xs md:text-lg font-semibold leading-4 text-whiteText/90 max-w-[250px] mt-1 ">
          The new tech gift you are<br/> wishing for right here.
        </p>
        <LinkButton className="w-44 relative flex items-center justify-center bg-whiteText text-darkText hover:bg-darkText hover:text-whiteText duration-200 mt-2" />
      </div>
    </Container>
  );
};

export default HomeBanner;