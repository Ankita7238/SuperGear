import Container from "../ui/Container";
import FavoriteProduct from "../ui/FavoriteProduct";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Favorite = () => {
  const favoriteProduct = useSelector((state) => state.store.favoriteProduct);

  return (
    <Container>
      {favoriteProduct?.length > 0 ? (
        <div>
          <div className="border-b border-b-gray-300 pb-6">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Favorite Products
            </h2>
            <p className="mt-2 text-sm text-gray-500 max-w-[700px] tracking-wide">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta
              ut commodi ipsam provident numquam, odit cupiditate, incidunt cum
              pa
            </p>
          </div>
          <div className="mt-6 flow-root px-4 sm:mt-10 sm:px-0">
            <div className="-my-6 divide-y divide-gray-200 sm:-my-10">
              {favoriteProduct?.map((product) => (
                <FavoriteProduct key={product?._id} product={product} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white h-96 flex flex-col gap-2 items-center justify-center py-5 rounded-lg border border-gray-200 drop-shadow-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Nothing added to Favorite
          </h1>
          <p className="text-lg max-w-[600px] text-center text-gray-600 tracking-wide leading-6">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem
            harum ducimus, quod amet pariatur omnis ex dolorem, distinctio
            molestiae aspernatur iste aperiam nostrum tempore accusamus modi
            quos culpa corrupti ea.
          </p>
          <Link
            to={"/product"}
             className="bg-gray-800 text-gray-200 px-8 py-4 rounded-md hover:bg-black hover:text-white duration-200 uppercase text-sm font-semibold tracking-wide"
          >
            Add Products
          </Link>
        </div>
      )}
    </Container>
  );
};

export default Favorite;
