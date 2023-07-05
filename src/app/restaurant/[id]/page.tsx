"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "@/api/axiosJWT";
import { Rate, Empty } from "antd";
import { usePathname, useRouter } from "next/navigation";
import ReviewModal from "@/common/ReviewModal";
import Menu from "./Menu";

const RestaurantDetail = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [restaurant, setRestaurant] = useState<any | null>(null);
  const [menu, setMenu] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  useEffect(() => {
    const id: number = Number.parseInt(pathname.split("/")[2]);
    fetchRestaurantDetail(id);
    fetchMenu(id);
    fetchReviews(id);
  }, []);

  const fetchMenu = async (id: number) => {
    try {
      const response = await axios.get(
        "http://13.212.172.169:3008/api/restaurants/detail/menu/" + id
      );
      console.log(response.data.foods);
      setMenu(response.data.foods);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReviews = async (id: number) => {
    try {
      const response = await axios.get(
        "http://13.212.172.169:3008/api/restaurants/detail/reviews/" + id
      );
      console.log(response.data.reviews);
      setReviews(response.data.reviews);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRestaurantDetail = async (id: number) => {
    try {
      const response = await axios.get(
        "http://13.212.172.169:3008/api/restaurants/detail/" + id
      );
      console.log(response.data);
      setRestaurant(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRouterToFoodDetail = (id: number) => {
    router.push("/food/" + id);
  };

  const updateComment = (comment: any) => {
    let newReviews = [...reviews, comment];
    newReviews = newReviews.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    setReviews(newReviews);
  };

  return (
    <div className="w-full flex justify-center ">
      <div className="flex flex-col mt-24 shadow-2xl p-5 rounded-lg scale-[1.4] translate-y-[200px] mb-[450px] max-w-[980px]">
        {/* Res infor block */}
        <div className="flex justify-center">
          {/* Res image block */}
          <div>
            <img
              src={restaurant?.photoUrl}
              alt="restaurant"
              className="w-[600px] h-[250px] rounded-l hover:scale-[1.05] cursor-pointer  transition-all duration-300 hover:rounded-r"
            />
          </div>
          {/* Res info block */}
          <div className="p-5 bg-[#fd7e14] text-white text-xl h-[210px] rounded-r">
            <div className="flex flex-col">
              <h1 className="text-3xl truncate text-ellipsis">
                {restaurant?.name}
              </h1>
              <span className="mt-5">
                <Rate disabled allowHalf value={restaurant?.rating} />
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
          <Menu
            menu={menu}
            handleRouterToFoodDetail={handleRouterToFoodDetail}
          />
        </div>

        {/* Res review block */}
        <div className="mt-5">
          <div className="font-bold text-2xl flex justify-between">
            <div>
              <span>レビュー</span>
            </div>
            <div>
              <ReviewModal
                name={restaurant?.name}
                id={restaurant?.id}
                type="restaurant"
                updateComment={updateComment}
              />
            </div>
          </div>
          <div className="flex  flex-col p-4">
            {reviews?.map((item) => (
              <div
                className="mb-3 p-[10px] w-full text-gray-700 transition-shadow duration-300 shadow-sm bg-white relative mx-auto  overflow-hidden cursor-pointer rounded-md border border-orange-200 border-solid flex "
                key={item.id}
              >
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
            {reviews.length === 0 ? (
              <Empty description="レビューがありません" />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetail;
