"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Rate } from "antd";
import { StarFilled } from "@ant-design/icons";

const RestaurantDetail = () => {
  const id = 1;
  const [restaurant, setRestaurant] = useState<any | null>(null);
  const [menu, setMenu] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    fetchRestaurantDetail();
    fetchMenu();
    fetchReviews();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3008/api/restaurants/detail/menu/" + id
      );
      console.log(response.data.foods);
      setMenu(response.data.foods);

    } catch (error) {
      console.log(error);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3008/api/restaurants/detail/reviews/" + id
      );
      console.log(response.data.reviews);
      setReviews(response.data.reviews);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRestaurantDetail = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3008/api/restaurants/detail/" + id
      );
      console.log(response.data.restaurant);
      setRestaurant(response.data.restaurant);

      const rating = response.data.restaurant.rating
        ? Math.round(Number.parseFloat(response.data.restaurant.rating))
        : 0;
      console.log(rating);
      setRating(rating);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col">
        {/* Res infor block */}
        <div className="flex justify-center">
          {/* Res image block */}
          <div>
            <img
              src={restaurant?.photoUrl}
              alt="restaurant"
              className="w-[600px] h-[250px]"
            />
          </div>
          {/* Res info block */}
          <div className="p-5 bg-[#fd7e14] text-white text-xl ">
            <div className="flex flex-col">
              <h1 className="text-3xl ">{restaurant?.name}</h1>
              <span className="mt-5">
                <Rate
                  disabled
                  defaultValue={4}
                />
                {restaurant?.rating ? (
                  <span className="ant-rate-text">
                    {Number(restaurant?.rating).toFixed(1)}
                  </span>
                ) : (
                  ""
                )}
              </span>
              <div>
                <span className="font-bold">住所:</span> {restaurant?.address}
              </div>
              <div className="">
                <span className="text-xl">
                  <span className="font-bold">営業時間:</span>{" "}
                  {restaurant?.activeTime}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Res menu block */}
        <div className="mt-5">
          <div className="font-bold text-2xl">メニュー</div>
          <div className="flex  content-start">
            {menu?.map((item) => (
              <div className="ml-4 mt-4 relative">
                <div className="absolute top-5 left-5 bg-[#FF903F] text-white font-bold text-xs p-2 z-20 rounded">
                  <StarFilled /> {Number.parseFloat(item.rating).toFixed(1)}
                </div>
                <div className="p-[10px] h-[270px] max-w-[200px] text-gray-700 transition-shadow duration-300 shadow-sm bg-white relative mx-auto  overflow-hidden  w-full cursor-pointer rounded-md border border-orange-200 border-solid">
                  {/* Nội dung */}
                  <div className="h-[170px] w-full overflow-hidden">
                    <img
                      src={item.photoUrl}
                      alt="food"
                      className="w-full h-fit"
                    />
                  </div>
                  <h5 className="font-bold my-2 ">{item.name}</h5>
                  <p className="text-[#FF7918] font-bold text-base mt-2">
                    {item.price}VND
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Res review block */}
        <div className="mt-5">
          <div className="font-bold text-2xl">レビュー</div>
          <div className="flex  flex-col p-4">
            {reviews?.map((item) => (
              <div className="mb-3 p-[10px] w-full text-gray-700 transition-shadow duration-300 shadow-sm bg-white relative mx-auto  overflow-hidden cursor-pointer rounded-md border border-orange-200 border-solid flex ">
                {/* Nội dung */}
                <img
                  src={item.userAvatar}
                  alt="user"
                  className="w-[70px] h-[70px] rounded-full"
                />
                <div className="ml-4">
                  <div className="flex flex-col">
                    <span className="font-bold">{item.userName}</span>
                    <span className="text-[#FF7918] font-bold text-base mt-2">
                      <Rate disabled defaultValue={item.rate} />
                    </span>
                  </div>
                  <div className="mt-4">{item.content}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
