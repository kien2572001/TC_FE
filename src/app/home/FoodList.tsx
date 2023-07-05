"use client";
import React, { useEffect, useState } from "react";
import homeApi from "@/api/homeApi";
import Filter from "./Filter";
import { Food } from "@/models/home";
import { Card, Empty } from "antd";
import { Rate } from "antd";
import { useRouter } from "next/navigation";
import { StarFilled } from "@ant-design/icons";
import Link from "next/link";

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
    return <p>料理が見つかりませんでした.</p>;
  }

  return (
    <div className="flex overflow-x-scroll pt-[10px] pb-[10px] mb-[10px]">
      {foods.map((food) => (
        <Link
          href={`/food/${food.id}`}
          className="mx-4 mt-4 relative hover:scale-105 transition-all duration-300 flex-[1_0_20%] max-w-[230px] text-decoration-none"
          key={food.id}
          style={{ textDecoration: "none" }}
        >
          <div className="p-[10px] h-[300px] max-w-[200px] text-gray-700 transition-shadow duration-300 shadow-sm bg-white relative mx-auto  overflow-hidden  w-full cursor-pointer rounded-md border border-orange-200 border-solid">
            {/* Nội dung */}
            <div className="h-[170px] w-full overflow-hidden ">
              <img
                src={food.photoUrl}
                alt="food"
                className="w-full max-h-[133px] object-fill"
              />
            </div>
            <h5 className="font-bold my-2 ">{food.name}</h5>
            <h6 className="font-bold my-2 opacity-70">{food.restaurant}</h6>
            <p className="text-[#FF7918] font-bold text-base mt-2 leading-none">
              {food.price}VND
            </p>
            <Rate disabled allowHalf value={food.rating} />
            <span className="pl-[4px] pb-[20px]">({food.rating})</span>
          </div>
        </Link>
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
