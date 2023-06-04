import React from "react";

type FilterProps = {
  onFilterChange: (value: string) => void;
};

const Filter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const handleOptionChange = (value: string) => {
    onFilterChange(value);
  };

  return (
    <div className="flex space-x-4 m-auto">
      <input
        type="button"
        value={"All"}
        className="bg-white p-[10px] w-[50px] h-[40px]"
        onClick={() => handleOptionChange("All")}
      />
      <input
        type="button"
        value={"Foods"}
        className="bg-white p-[10px] w-[70px] h-[40px]"
        onClick={() => handleOptionChange("Foods")}
      />
      <input
        type="button"
        value={"Food"}
        className="bg-white p-[10px] w-[70px] h-[40px]"
        onClick={() => handleOptionChange("Drinks")}
      />
      <input
        type="button"
        value={"Rating"}
        className="bg-white p-[10px] w-[70px] h-[40px]"
        onClick={() => handleOptionChange("Rating")}
      />
      <input
        type="button"
        value={"Cheap"}
        className="bg-white p-[10px] w-[70px] h-[40px]"
        onClick={() => handleOptionChange("Cheap")}
      />
    </div>
  );
};

export default Filter;
