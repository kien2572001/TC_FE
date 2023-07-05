"use client";

import { useState, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  Radio,
  TimePicker,
  InputNumber,
  Select,
  message,
  Checkbox,
} from "antd";
import UploadImage from "../UploadImage";
import { Store } from "antd/lib/form/interface";
import axios from "@/api/axiosJWT";
import { useRouter } from "next/navigation";
type LayoutType = Parameters<typeof Form>[0]["layout"];

const { TextArea } = Input;

type Props = {};

const AddFoodPage: React.FC<Props> = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [formLayout, setFormLayout] = useState<LayoutType>("vertical");
  const [foodName, setFoodName] = useState<string>("");
  const [foodPrice, setFoodPrice] = useState<string>("");
  const [restaurantId, setRestaurantId] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [isFood, setIsFood] = useState<boolean>(false);

  const [restaurantList, setRestaurantList] = useState<any[]>([]);

  const router = useRouter();

  useEffect(() => {
    fetchRestaurantList();
  }, []);

  const fetchRestaurantList = async () => {
    try {
      const response = await axios.get(
        "http://13.212.172.169:3008/api/restaurants/all"
      );
      const restaurantList = response?.data?.restaurants?.map(
        (restaurant: any) => ({
          label: restaurant.name,
          value: restaurant.id,
        })
      );
      setRestaurantList(restaurantList);
    } catch (error) {
      console.log(error);
    }
  };

  const formItemLayout =
    formLayout === "horizontal"
      ? { labelCol: { span: 4 }, wrapperCol: { span: 14 } }
      : null;

  const onFinish = (values: Store) => {
    console.log("Form values:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Form validation failed:", errorInfo);
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
    },
  };

  const successMessage = () => {
    message.success("料理を登録しました");
  };

  const errorMessage = () => {
    message.error("料理の登録に失敗しました");
  };

  const handleCreateFood = async () => {
    try {
      await form.validateFields();
      const response = await axios.post("http://13.212.172.169:3008/api/foods/", {
        name: foodName,
        price: Number.parseInt(foodPrice),
        restaurantId: restaurantId,
        description: description,
        photoUrl: image,
        isFood: isFood,
        isDraft: false,
      });
      if (response?.status === 201) {
        window.location.reload();
        // router.push("/food/" + response?.data?.food?.id);
      }
    } catch (error) {
      errorMessage();
    }
  };

  useEffect(() => {
    console.log(foodPrice);
  }, [foodPrice]);

  return (
    <div className="flex justify-center items-center h-screen bg-blue-200">
      <div className="flex flex-col items-center justify-center w-[400px] p-10 bg-white shadow-lg overflow-hidden rounded-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold">料理</h1>
        </div>
        <Form
          {...formItemLayout}
          layout={formLayout}
          form={form}
          initialValues={{ layout: formLayout }}
          size="large"
          style={{ width: "100%", fontSize: "16px" }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          validateMessages={validateMessages}
        >
          <Form.Item
            label={<span className="font-bold text-lg">料理名</span>}
            name="foodName"
            rules={[
              {
                required: true,
                message: (
                  <span className="text-red-500 text-xs">
                    料理名を入力してください
                  </span>
                ),
                max: 50,
              },
            ]}
            className="font-bold"
          >
            <Input
              type="text"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label={<span className="font-bold text-lg">料理価格</span>}
            className="font-bold flex justify-between items-center"
          >
            <Input
              type="number"
              value={foodPrice}
              onChange={(e) => setFoodPrice(e.target.value)}
              className="w-[200px]"
            />
            <Radio.Group
              value={isFood}
              onChange={(e) => setIsFood(e.target.value)}
              className="ml-5 mt-3"
            >
              <Radio value={true}>料理</Radio>
              <Radio value={false}>その他</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label={<span className="font-bold text-lg">レストラン名</span>}
            name="restaurantId"
            rules={[
              {
                required: true,
                message: (
                  <span className="text-red-500 text-xs">
                    レストラン名を入力してください
                  </span>
                ),
              },
            ]}
            className="font-bold"
          >
            <Select
              options={restaurantList}
              value={restaurantId}
              onChange={(value) => setRestaurantId(value)}
            />
          </Form.Item>
          <Form.Item
            label={<span className="font-bold text-lg">説明</span>}
            name="description"
            rules={[
              {
                required: true,
                message: (
                  <span className="text-red-500 text-xs">
                    説明を入力してください
                  </span>
                ),
                max: 400,
              },
            ]}
            className="font-bold"
          >
            <Input.TextArea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label={<span className="font-bold text-lg">写真</span>}
            className="font-bold"
            rules={[
              {
                required: true,
                message: (
                  <span className="text-red-500 text-xs">
                    写真を選択してください
                  </span>
                ),
              },
            ]}
          >
            <UploadImage image={image} setImage={setImage} />
          </Form.Item>
          <Form.Item className="flex justify-center">
            <Button type="primary" htmlType="submit" onClick={handleCreateFood}>
              リクエスト
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddFoodPage;
