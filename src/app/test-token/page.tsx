"use client";
import axiosJWT from "@/api/axiosJWT";
import axios from "axios";
import React, { useEffect } from "react";

type Props = {};

const TestToken = (props: Props) => {
  const callAPI = async () => {
    try {
      const res = await axiosJWT.get("https://tastingcuisine.kien2572001.tech/api/user/all");
      console.log("res: ", res);
    } catch (error) {
      console.log("error: ", error);
    }
  };
  useEffect(() => {
    callAPI();
  }, []);
  return <div>TestToken</div>;
};

export default TestToken;
