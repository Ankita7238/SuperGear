import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; // Import from Redux
import { db } from "../lib/firebase";
import Container from "../ui/Container";
import FormattedPrice from "../ui/FormattedPrice";
import Loading from "../ui/Loading";

const Orders = () => {
  const currentUser = useSelector((state) => state.store.currentUser); // Get currentUser from Redux store
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "orders", currentUser?.email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const orderData = docSnap?.data()?.orders;
          setOrders(orderData);
        } else {
          console.log("No orders yet!");
        }
      } catch (error) {
        console.log("Data fetching error", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [currentUser]);

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : orders?.length > 0 ? (
        <div className="max-w-5xl mx-auto mt-3">
          <h2 className="text-2xl font-bold mt-1">Customer order details</h2>
          <p className="text-gray-600">
            Customer Name{" "}
            <span className="text-black font-semibold">
              {currentUser?.firstName} {currentUser?.lastName}
            </span>
          </p>
          <p className="text-gray-600">
            Total Orders{" "}
            <span className="text-black font-semibold">{orders?.length}</span>
          </p>
          <p className="text-sm max-w-[600px] tracking-wide text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
            porro
          </p>
          <div className="flex flex-col gap-3">
            <div className="space-y-6 divide-y divide-gray-900/10">
              {orders?.map((order) => {
                const totalAmt = order?.orderItems.reduce(
                  (acc, item) =>
                    acc + (item?.discountedPrice * item?.quantity || 0),
                  0
                );
                return (
                  <Disclosure as="div" key={order?.paymentId} className="pt-6">
                    {({ open }) => (
                      <>
                        <dt>
                          <DisclosureButton className="flex w-full items-center justify-between text-left text-gray-900">
                            <span className="text-base font-semibold leading-5">
                              Tracking number:{" "}
                              <span className="font-normal">
                                {order?.orderedOn}
                              </span>
                            </span>
                            <span>{open ? <FaMinus /> : <FaPlus />}</span>
                          </DisclosureButton>
                        </dt>
                        <div>
                        <DisclosurePanel as="dd" className="mt-5">
                          <div className="flex flex-col gap-2 bg-[#f4f4f480] p-5 border border-gray-200">
                            <div className="flex flex-col gap-1">
                              <p className="text-gray-600">
                                Order Item Count:{" "}
                                <span className="text-black font-medium">
                                  {order?.orderItems?.length}
                                </span>
                              </p>
                              <p className="text-gray-600">
                                Order Amount:{" "}
                                <span className="text-black font-medium">
                                  <FormattedPrice amount={totalAmt} />
                                </span>
                              </p>
                            </div>
                            {order?.orderItems?.map((item) => (
                              <div
                                key={item?._id}
                                className="flex space-x-6 border-b border-gray-200 py-3"
                              >
                                <Link
                                  to={`/product/${item?._id}`}
                                  className="h-20 w-20 flex-none sm:h-40 sm:w-40 rounded-lg bg-gray-100 border border-gray-300 hover:border-skyText overflow-hidden"
                                >
                                  <img
                                    src={item?.images[0]}
                                    alt="productImg"
                                    className="h-full w-full object-cover object-center hover:scale-110 duration-300"
                                  />
                                </Link>
                                <div className="flex flex-auto flex-col">
                                  <div>
                                    <Link
                                      to={`/product/${item?._id}`}
                                      className="font-medium text-gray-900"
                                    >
                                      {item?.name}
                                    </Link>
                                    
                                  </div>
                                  <div className="mt-4 flex flex-1 ">
                                    <dl className="flex flex-wrap space-x-4 divide-x divide-gray-200 text-sm sm:space-x-6">
                                      <div className="flex flex-nowrap font-medium text-gray-900">
                                        <dt className="">
                                          Quantity:
                                        </dt>
                                        <dd className="">
                                          &nbsp;{item?.quantity}
                                        </dd>
                                      </div>
                                      <div className="flex flex-nowrap font-medium text-gray-900">
                                        <dt className="">
                                          Price:
                                        </dt>
                                        <dd className="">
                                          <span className="">&nbsp;
                                            <FormattedPrice
                                              amount={item?.discountedPrice}
                                            />
                                          </span>
                                        </dd>
                                      </div>
                                      <div className="flex flex-nowrap font-medium text-gray-900">
                                        <dt className="">
                                          SubTotal:
                                        </dt>
                                        <dd className="">
                                          <span className="">&nbsp;
                                            <FormattedPrice
                                              amount={
                                                item?.discountedPrice *
                                                item?.quantity
                                              }
                                            />
                                          </span>
                                        </dd>
                                      </div>
                                    </dl>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </DisclosurePanel>
                        </div>
                      </>
                    )}
                  </Disclosure>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <p className="text-2xl font-semibold">No orders yet</p>
          <p>You did not create any purchase from us</p>
          <Link
            to={"/product"}
            className="mt-2 bg-gray-800 text-gray-100 px-6 py-2 rounded-md hover:bg-black hover:text-white duration-200"
          >
            Go to Shopping
          </Link>
        </div>
      )}
    </Container>
  );
};

export default Orders;
