import React, { useEffect, useState } from "react";
import homeApi from "../../api/homeApi";
import { Restaurant } from "../../models/home";
import { Card } from "antd";
import { Rate } from "antd";    

const { Meta } = Card;

const RestaurantList = ({ restaurantsData }: { restaurantsData: any }) => {
    const [restaurants, setRestaurants] = useState<Restaurant[]>(restaurantsData);

    useEffect(() => {
        setRestaurants(restaurantsData);
    }, [restaurantsData]);

    // useEffect(() => {
    //     const fetchRestaurants = async () => {
    //         try {
    //             const response = await homeApi.getRestaurantsAll();
    //             console.log(response)
    //         } catch (error) {
    //             console.error("Failed to fetch restaurants:", error);
    //         }
    //     };
    //     fetchRestaurants();
    // }, []);

    if (!restaurants || restaurants.length === 0) {
        return <p>No restaurants found.</p>;
    }

    return (
        <div className="flex overflow-x-scroll py-[10px]">
            {restaurants.map((restaurant) => (
                // <div
                //   key={restaurant.id}
                //   className="flex m-auto flex-col border-[1px] border-black border-solid p-[10px] mx-[30px] my-[20px]"
                // >
                //   <div className="flex m-auto w-[150px] h-[170px]">
                //     <img
                //       className="w-full h-full"
                //       src={restaurant.photoUrl}
                //       alt="restaurant img"
                //     />
                //   </div>
                //   <div className="flex m-auto flex-col">
                //     <h2>{restaurant.name}</h2>
                //     <span className="align-middle items-center">rating</span>
                //   </div>
                // </div>
                <Card
                    key={restaurant.id}
                    hoverable
                    style={{ width: 240, margin: "0 30px", borderColor: "#cec2c2", maxWidth: "240px", minWidth: "240px", marginBottom: "20px" }}
                    cover={<img alt="restaurant img" src={restaurant.photoUrl} />}
                    bordered
                >
                    <Meta title={restaurant.name} />
                    <Rate allowHalf disabled defaultValue={restaurant.rating} style={{marginRight: "10px"}}/>
                    ({restaurant.rating})
                </Card>
            ))}
        </div>
    );
};

export default RestaurantList;
