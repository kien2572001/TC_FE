"use client";
import React, { useEffect, useState } from "react";
import homeApi from "@/api/homeApi";
import Filter from "./Filter";
import { Food } from "@/models/home";
import { Card, Empty } from "antd";
import { Rate } from "antd";
import { useRouter } from "next/navigation";

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
    <div className="flex overflow-x-scroll py-[10px]">
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
        //     <span className="align-middle items-center">rating</span>
        //   </div>
        // </div>
        <Card
          key={food.id}
          hoverable
          style={{
            width: 240,
            margin: "0 30px",
            borderColor: "#cec2c2",
            maxWidth: "240px",
            minWidth: "240px",
            marginBottom: "20px",
          }}
          cover={<img alt="food img" src={food.photoUrl} />}
          bordered
          onClick={() => navigateToFoodDetail(food.id)}
        >
          <Meta title={food.name} />
          <Rate
            allowHalf
            disabled
            defaultValue={food.rating}
            style={{ marginRight: "10px" }}
          />
          ({food.rating})
        </Card>
      ))}
      {foods && foods.length === 0 && (
        <div className="flex justify-center items-center w-full h-full">
          <Empty className="mt-5" description="メニューがありません" />
        </div>
      )}
    </div>
  );
};

export default FoodList;
