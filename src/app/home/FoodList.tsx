"use client";
import React, { useEffect, useState } from "react";
import homeApi from "@/api/homeApi";
import Filter from "./Filter";
import { Food } from "@/models/home";
import { Card, Empty } from "antd";
import { Rate } from "antd";
import { useRouter } from "next/navigation";
import { StarFilled } from "@ant-design/icons";

const { Meta } = Card;

const FoodList = ({ foodsData }: { foodsData: any }) => {
  const [foods, setFoods] = useState<Food[]>(foodsData);
  const router = useRouter();

  useEffect(() => {
    setFoods(foodsData);
  }, [foodsData]);

  const navigateToFoodDetail = (foodId: number) => {
    router.push(`/food/${foodId}`);
  };

  if (!foods || foods.length === 0) {
    return <p>No foods found.</p>;
  }


  return (
    <div className="flex overflow-x-scroll pt-[10px] pb-[20px]">
      {foods.map((food) => (
        
        // <div
        //   key={food.id}
        //   className="flex m-auto flex-col border-[1px] border-black border-solid p-[10px] mx-[30px] my-[20px]"
        // >
        //   <div className="flex m-auto w-[150px] h-[170px]">
        //     <img className="w-full h-full" src={food.photoUrl} alt="food img" />
        //   </div>
        //   <div className="flex m-auto flex-col">
        //     <h2>{food.name}</h2>
        //     <span className="align-middle foods-center">rating</span>
        //   </div>
        // </div>
        <div
                className="ml-4 mt-4 relative hover:scale-105 transition-all duration-300 flex-[1_0_20%] "
                key={food.id}
                onClick={() => navigateToFoodDetail(food.id)}
              >
                <div className="absolute top-5 left-5 bg-[#FF903F] text-white font-bold text-xs p-2 z-20 rounded ">
                  <StarFilled /> {Number.parseFloat(food.rating).toFixed(1)}
                </div>
                <div className="p-[10px] h-[270px] max-w-[200px] text-gray-700 transition-shadow duration-300 shadow-sm bg-white relative mx-auto  overflow-hidden  w-full cursor-pointer rounded-md border border-orange-200 border-solid">
                  {/* Nội dung */}
                  <div className="h-[170px] w-full overflow-hidden">
                    <img
                      src={food.photoUrl}
                      alt="food"
                      className="w-full h-fit"
                    />
                  </div>
                  <h5 className="font-bold my-2 ">{food.name}</h5>
                  <p className="text-[#FF7918] font-bold text-base mt-2">
                    {food.price}VND
                  </p>
                </div>
              </div>
      ))}
      {foods && foods.length === 0 && (
        <div className="flex justify-center foods-center w-full h-full">
          <Empty className="mt-5" description="メニューがありません" />
        </div>
      )}
    </div>
  );
};

export default FoodList;
