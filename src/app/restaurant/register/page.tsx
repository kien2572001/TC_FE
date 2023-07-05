"use client";

import { useState, useEffect } from "react";
import { Button, Form, Input, Radio, TimePicker, Col, message } from "antd";
import UploadImage from "../UploadImage";
import { Store } from "antd/lib/form/interface";
import dayjs from "dayjs";
import axios from "axios";
import { useRouter } from "next/navigation";

type LayoutType = Parameters<typeof Form>[0]["layout"];

type Props = {};

const RestaurantRegisterPage: React.FC<Props> = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [formLayout, setFormLayout] = useState<LayoutType>("vertical");
  const [restaurantName, setRestaurantName] = useState<string>("");
  const [restaurantAddress, setRestaurantAddress] = useState<string>("");
  const [fromTime, setFromTime] = useState<dayjs.Dayjs | null>(null);
  const [toTime, setToTime] = useState<dayjs.Dayjs | null>(null);
  const [image, setImage] = useState<string>("");
  const router = useRouter();

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

  const handleFromTimeChange = (time: dayjs.Dayjs | null) => {
    setFromTime(time);
  };

  const handleToTimeChange = (time: dayjs.Dayjs | null) => {
    setToTime(time);
  };

  const successMessage = () => {
    message.success("レストランを登録しました");
  };

  const errorMessage = () => {
    message.error("レストランの登録に失敗しました");
  };

  const handleCreateRestaurant = async () => {
    try {
      await form.validateFields();
      const res = await axios.post("http://localhost:3008/api/restaurants", {
        name: restaurantName,
        address: restaurantAddress,
        activeTime: fromTime?.format("HH:mm") + "-" + toTime?.format("HH:mm"),
        photoUrl:
          image !== ""
            ? image
            : "https://cdn.vox-cdn.com/thumbor/5d_RtADj8ncnVqh-afV3mU-XQv0=/0x0:1600x1067/1200x900/filters:focal(672x406:928x662)/cdn.vox-cdn.com/uploads/chorus_image/image/57698831/51951042270_78ea1e8590_h.7.jpg",
        isDraft: false,
      });

      if (res.status === 201) {
        successMessage();
        //push to home page
        window.location.reload();
        // router.push("/restaurant/" + res.data.id);
      } else {
        errorMessage();
      }
    } catch (error) {
      console.log(error);
      errorMessage();
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-blue-200">
      <div className="flex flex-col items-center justify-center w-[500px] p-10 bg-white shadow-lg overflow-hidden rounded-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold">レストラン</h1>
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
            label={<span className="font-bold text-lg">レストラン名</span>}
            name="restaurantName"
            rules={[
              {
                required: true,
                message: (
                  <span className="text-red-500 text-xs">
                    レストラン名を入力してください
                  </span>
                ),
                max: 50,
              },
            ]}
            className="font-bold"
          >
            <Input
              type="text"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label={<span className="font-bold text-lg">住所</span>}
            name="restaurantAddress"
            rules={[
              {
                required: true,
                message: (
                  <span className="text-red-500 text-xs">
                    住所を入力してください
                  </span>
                ),
                max: 100,
              },
            ]}
            className="font-bold"
          >
            <Input
              type="text"
              value={restaurantAddress}
              onChange={(e) => setRestaurantAddress(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label={<span className="font-bold text-lg">営業時間</span>}
            name="businessHours"
            className="font-bold"
            rules={[
              {
                required: true,
                message: (
                  <span className="text-red-500 text-xs">
                    営業時間を入力してください
                  </span>
                ),
              },
            ]}
          >
            <TimePicker.RangePicker
              format="HH:mm"
              value={[fromTime, toTime]}
              placeholder={['開始時間', '終了時間']} 
              onChange={(value) => {
                handleFromTimeChange(value[0]);
                handleToTimeChange(value[1]);
                console.log(value);
              }}
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
            <Button
              type="primary"
              htmlType="submit"
              onClick={handleCreateRestaurant}
            >
              リクエスト
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RestaurantRegisterPage;
