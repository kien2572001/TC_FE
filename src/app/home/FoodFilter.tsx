import React from "react";

type FoodFilterProps = {
  onChange: (value: string) => void;
};

const FoodFilter = ({ onChange }: FoodFilterProps) => {
  const handleFilterChange = (value: string) => {
    onChange(value);
  };

  return (
    <div className="flex space-x-4 m-auto">
      <input
        type="button"
        value={"All"}
        className="bg-white p-[10px] w-[50px] h-[40px]"
        onClick={() => handleFilterChange("All")}
      />
      <input
        type="button"
        value={"Foods"}
        className="bg-white p-[10px] w-[70px] h-[40px]"
        onClick={() => handleFilterChange("Foods")}
      />
      <input
        type="button"
        value={"Drinks"}
        className="bg-white p-[10px] w-[70px] h-[40px]"
        onClick={() => handleFilterChange("Drinks")}
      />
      <input
        type="button"
        value={"Rating"}
        className="bg-white p-[10px] w-[70px] h-[40px]"
        onClick={() => handleFilterChange("Rating")}
      />
      <input
        type="button"
        value={"Cheap"}
        className="bg-white p-[10px] w-[70px] h-[40px]"
        onClick={() => handleFilterChange("Cheap")}
      />
    </div>
  );
};

export default FoodFilter;
