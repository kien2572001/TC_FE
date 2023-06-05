"use client";
import { authApi } from "@/api/authApi";
import { Button, Form, Input, message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {};

const Login = (props: Props) => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = async (values: any) => {
    const success = await authApi.login(values);
    if (success) {
      messageApi.open({
        type: "success",
        content: "Login success!",
      });
      router.push("/home");
    } else {
      messageApi.open({
        type: "error",
        content: "Login fail!",
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="flex justify-center items-center h-screen">
      {contextHolder}
      <div className="bg-white shadow-xl p-12 flex items-center flex-col">
        <h3>TC</h3>
        <Form
          className="w-72"
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="ユーザー名"
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              { required: true, message: "Please input your username!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="パスワード"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item className="flex w-full justify-center mb-0">
            <Button
              className="w-40 bg-primary"
              type="primary"
              htmlType="submit"
            >
              ログイン
            </Button>
          </Form.Item>
          <div className="flex flex-col items-center">
            <p>アカウントを持っていません</p>
            <Button className="w-40">
              <Link href="/register">サインアップ</Link>
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
