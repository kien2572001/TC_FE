"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { Rate, Empty } from "antd";

const FoodDetail = () => {
  const pathname = usePathname();
  const [food, setFood] = useState<any | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const id: number = Number.parseInt(pathname.split("/")[2]);
    fetchFoodDetail(id);
    fetchFoodReviews(id);
  }, []);

  const fetchFoodReviews = async (id: number) => {
    try {
      const response = await axios.get(
        "http://localhost:3008/api/foods/detail/reviews/" + id
      );
      setReviews(response.data.reviews);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFoodDetail = async (id: number) => {
    try {
      const response = await axios.get(
        "http://localhost:3008/api/foods/detail/" + id
      );
      //console.log(response.data.food);
      setFood(response.data.food);
    } catch (error) {
      console.log(error);
    }
  };

  const router = useRouter();
  const handleRedirectToRestaurant = () => {
    router.push("/restaurant/" + food?.restaurantId);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col mt-10 shadow-xl p-5 rounded-lg scale-[1.5] translate-y-[120px] mb-[350px]">
        {/* Food info block */}
        <div className="flex justify-center">
          {/* Food image block */}
          <div>
            <img
              src={food?.photoUrl}
              alt="food"
              className="w-[300px] h-[300px] rounded-l hover:scale-[1.05] cursor-pointer  transition-all duration-300 hover:rounded-r"
            />
          </div>
          {/* Res info block */}
          <div className="p-5 pl-10 pr-96 bg-[#fd7e14] text-white text-xl h-[260px] rounded-r">
            <div className="flex flex-col">
              <h1 className="text-3xl ">{food?.name}</h1>
              <span className="mt-5">
                <Rate disabled defaultValue={4} />
                {food?.rating ? (
                  <span className="ant-rate-text">
                    {Number(food?.rating).toFixed(1)}
                  </span>
                ) : (
                  ""
                )}
              </span>
              <div
                onClick={handleRedirectToRestaurant}
                className="mt-2 hover:scale-[1.05] cursor-pointer  transition-all duration-300"
              >
                <span className="font-bold">レストラン名: </span>
                {food?.restaurant}
              </div>
              <div className="">
                <span className="text-xl">
                  <span className="font-bold">価格: </span> {food?.price} VND
                </span>
              </div>
            </div>
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
            {reviews.length === 0 ? (
              <Empty className="my-5" description="レビューがありません" />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetail;
