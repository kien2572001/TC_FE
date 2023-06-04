import React, { useEffect, useState } from "react";
import homeApi from "../../api/homeApi";

type FoodListProps = {
  filter: string;
};

const FoodList: React.FC<FoodListProps> = ({ filter }) => {
  const [foods, setFoods] = useState<any[]>([]);
  const [res, setRes] = useState("");

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await homeApi.getFoodAll();
        setFoods(response);
      } catch (error) {
        console.error("Failed to fetch foods:", error);
      }
    };
    fetchFoods();
  }, []);

  if (!foods || foods.length === 0) {
    return <p>No foods found.</p>;
  }

  const filteredFoods = filterFoods(foods, filter);

  function filterFoods(foods: any[], filter: string): any[] {
    // Implement your filtering logic here based on the provided filter value
    // This is just an example, you should adjust it to match your actual filtering requirements
    if (filter === "All") {
      return foods;
    } else if (filter === "Foods") {
      return foods.filter((food) => food.type === "Food");
    } else if (filter === "Drinks") {
      return foods.filter((food) => food.type === "Drink");
    } else if (filter === "Rating") {
      return foods.filter((food) => food.rating === "Rating");
    } else if (filter === "Cheap") {
      return foods.filter((food) => food.price === "Cheap");
    } else {
      return foods;
    }
  }

  return (
    <div className="flex overflow-x-scroll">
      {filteredFoods.map((food) => (
        <div
          key={food.id}
          className="flex m-auto flex-col border-[1px] border-black border-solid p-[10px]"
        >
          <div className="flex m-auto w-[150px] h-[170px]">
            <img
              className="w-full h-full"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Barbieri_-_ViaSophia25668.jpg/1200px-Barbieri_-_ViaSophia25668.jpg"
              alt="food img"
            />
          </div>
          <div className="flex m-auto flex-col">
            <h2>{food.name}</h2>
            <h2>{res}</h2>
            <span className="align-middle items-center">rating</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodList;
