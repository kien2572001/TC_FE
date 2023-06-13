import React, { useEffect, useState } from "react";
import homeApi from "../../api/homeApi";
import { Restaurant } from "../../models/home";
import { Card } from "antd";
import { Rate, Empty } from "antd";
import { useRouter } from "next/navigation";

const { Meta } = Card;

const RestaurantList = ({ restaurantsData }: { restaurantsData: any }) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(restaurantsData);
  const router = useRouter();

  useEffect(() => {
    setRestaurants(restaurantsData);
  }, [restaurantsData]);

  const navigateToRestaurantDetail = (restaurantId: number) => {
    router.push(`/restaurant/${restaurantId}`);
  };

  if (!restaurants || restaurants.length === 0) {
    return <p>No restaurants found.</p>;
  }

  return (
    <div className="flex overflow-x-scroll py-[10px]">
      {restaurants.map((restaurant) => (
        <Card
          key={restaurant.id}
          hoverable
          style={{
            width: 240,
            margin: "0 30px",
            borderColor: "#cec2c2",
            maxWidth: "240px",
            minWidth: "240px",
            marginBottom: "20px",
          }}
          cover={<img alt="restaurant img" src={restaurant.photoUrl} />}
          bordered
          onClick={() => navigateToRestaurantDetail(restaurant.id)}
        >
          <Meta title={restaurant.name} />
          <Rate
            allowHalf
            disabled
            defaultValue={restaurant.rating}
            style={{ marginRight: "10px" }}
          />
          ({restaurant.rating})
        </Card>
      ))}
      {restaurants?.length === 0 && (
        <div className="flex justify-center items-center w-full h-full">
          <Empty className="mt-5" description=" No restaurants found." />
        </div>
      )}
    </div>
  );
};

export default RestaurantList;
