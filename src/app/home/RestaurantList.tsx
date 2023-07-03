import React, { useEffect, useState } from "react";
import homeApi from "../../api/homeApi";
import { Restaurant } from "../../models/home";
import { Card } from "antd";
import { Rate, Empty } from "antd";
import { useRouter } from "next/navigation";
import { StarFilled } from "@ant-design/icons";
import Link from "next/link";

const { Meta } = Card;

const RestaurantList = ({ restaurantsData }: { restaurantsData: any }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(restaurantsData);
  const router = useRouter();

  useEffect(() => {
    setRestaurants(restaurantsData);
  }, [restaurantsData]);

  if (!restaurants || restaurants.length === 0) {
    return <p>レストランが見つかりませんでした.</p>;
  }

  return (
    <div className="flex overflow-x-scroll pt-[10px] pb-[20px]">
      {restaurants.map((restaurant) => (
        <Link
          href={`/restaurant/${restaurant.id}`}
          key={restaurant.id}
          style={{ textDecoration: "none" }}
          className="mx-4 mt-4 relative hover:scale-105 transition-all duration-300 flex-[1_0_20%] max-w-[230px] text-decoration-none"
          /* onClick={() => navigateToRestaurantDetail(restaurant.id)} */
        >
          <div className="absolute top-5 left-[-0.75rem] bg-[#FF903F] text-white font-bold text-xs p-2 z-20 rounded ">
            <StarFilled /> {Number.parseFloat(restaurant.rating).toFixed(1)}
          </div>
          <div className="p-[10px] h-[210px] max-w-[200px] text-gray-700 transition-shadow duration-300 shadow-sm bg-white relative mx-auto  overflow-hidden  w-full cursor-pointer rounded-md border border-orange-200 border-solid">
            {/* Nội dung */}
            <div className="h-[170px] w-full overflow-hidden">
              <img
                src={
                  !restaurant.photoUrl
                    ? "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
                    : restaurant.photoUrl
                }
                alt="food"
                className="w-full h-fit"
              />
            </div>
            <h5 className="font-bold my-2 text-decoration-none">
              {restaurant.name}
            </h5>
          </div>
        </Link>
      ))}
      {restaurants?.length === 0 && (
        <div className="flex justify-center restaurants-center w-full h-full">
          <Empty className="mt-5" description=" No restaurants found." />
        </div>
      )}
    </div>
  );
};

export default RestaurantList;
