"use client";
import React, {
  useState,
  useRef,
  useEffect,
  use,
  useLayoutEffect,
} from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Form, Input, Button } from "antd";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

type Props = {};

const UserProfile: React.FC<Props> = () => {
  const [avatarImage, setAvatarImage] = useState<string | null>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const notify = () =>
    toast.success("プロファイルが正常に更新されました!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  useLayoutEffect(() => {
    if (localStorage) {
      setRefreshToken(localStorage.getItem("refreshToken") || "");
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${refreshToken}`,
        };

        const response = await axios.get(
          "http://13.212.172.169:3008/api/user/profile",
          { headers }
        );
        const userData = response.data.user;
        setAvatarImage(userData.avatar);
        setUserName(userData.name);
        setUserEmail(userData.email);

        console.log(userData);

        form.setFieldsValue({
          name: userData.name,
          email: userData.email,
        });
      } catch (error) {
        // Handle error here
      }
    };

    fetchUserData();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setAvatarImage(URL.createObjectURL(file));
    }
  };

  const handleImageUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (values: any) => {
    const formData = new FormData();
    notify();
    if (avatarImage) {
      const response = await fetch(avatarImage);
      const blob = await response.blob();
      const file = new File([blob], "image.jpg");
      formData.append("file", file, "image.jpg");
    }

    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("password", values.password);

    if (typeof window !== "undefined") {
        localStorage.setItem("userName", values.name);
    }

    // Upload the avatar file to the backend API
    const fetchAvatarUrl = async () => {
      try {
        const uploadResponse = await axios.post(
          "http://13.212.172.169:3008/api/upload-cloudinary/image",
          formData // Passing the file directly, not the entire formData
        );

        console.log("Image upload response:", uploadResponse.data);
        formData.append("avatar", uploadResponse.data.url);
        
        if (typeof window !== "undefined") {
            //@ts-ignore
            localStorage.setItem("userAvatar", formData.get("avatar"));
        }
      } catch (error) {
        console.error("Image upload error:", error);
      }
    };

    await fetchAvatarUrl(); // Wait for fetchAvatarUrl to complete
    // Reset the form fields and avatar image

    const updateProfile = async () => {
      const formDataObject = {};
      const headers = {
        Authorization: `Bearer ${refreshToken}`,
      };
      formData.delete("file");
      //@ts-ignore
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
        //@ts-ignore
        formDataObject[key] = value;
      }
      const response = await axios.put(
        "http://13.212.172.169:3008/api/user/update",
        formDataObject,
        { headers }
      );
      console.log(response.data);
    };

    await updateProfile();
    // form.resetFields();
    // setAvatarImage(null);
    // localStorage.removeItem("userAvatar");
  };

  const [form] = Form.useForm();
  const initialValues = {
    name: userName,
    email: userEmail,
  };

  return (
    <div className="space-y-[10px] py-[20px] mb-[20px] bg-cover bg-[url('https://img.freepik.com/free-photo/blurred-corridor-with-chairs-tables_1203-166.jpg?w=740&t=st=1686197323~exp=1686197923~hmac=2e1b0a787055a1176f03ef10a7990945b584d6fd9d8d2ed6bec593905a190b28')]">
      <div className="flex max-w-[1200px] 2xl:max-w-[1500px] h-[800px] m-auto p-[30px] flex-col shadow-md shadow-gray rounded-md max-h-[600px] min-h-[400px] space-y-[10px] bg-white">
        <h1 className="leading-none pb-[20px] border-solid border-gray border-0 border-b-[1px]">
          プロフィール
        </h1>
        <div className="flex flex-row m-auto space-x-4">
          <div className="flex flex-col m-auto max-w-[600px] mx-[50px]">
            {avatarImage ? (
              <Avatar size={200} src={avatarImage} />
            ) : (
              <Avatar size={200} icon={<UserOutlined />} />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
              ref={fileInputRef}
            />
            <Button
              size="middle"
              className="mt-[30px]"
              type="default"
              onClick={handleImageUploadClick}
            >
              アバターを選択
            </Button>
          </div>
          <div className="w-[900px] flex pt-[20px]">
            <Form
              style={{ maxWidth: 60, margin: "auto", minWidth: 500 }}
              layout="vertical"
              form={form}
              onFinish={handleSubmit}
              initialValues={initialValues}
            >
              <Form.Item label="ユーザー名" name="name">
                <Input placeholder="ユーザー名" />
              </Form.Item>
              <Form.Item label="Eメール" name="email">
                <Input placeholder="Eメール" />
              </Form.Item>
              <Form.Item label="パスワード" name="password">
                <Input.Password
                  placeholder="パスワード"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
              <Form.Item className="flex flex-row-reverse">
                <Button
                  type="primary"
                  size="large"
                  style={{ backgroundColor: "#FF903F", marginRight: "600px" }}
                  htmlType="submit"
                >
                  保存
                </Button>
                <ToastContainer />
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
