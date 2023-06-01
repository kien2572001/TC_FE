"use client";
import { authApi } from "@/api/authApi";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";
type Props = {};

const Register = (props: Props) => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = async (values: any) => {
    const success = await authApi.register(values);
    if (success) {
      messageApi.open({
        type: "success",
        content: "Register success!",
      });
      router.push("/login");
    } else {
      messageApi.open({
        type: "error",
        content: "Register fail!",
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
          className="w-96"
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Username"
            name="name"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="privacyPolicyAgreed"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Should accept agreement")),
              },
            ]}
            valuePropName="checked"
          >
            <Checkbox> プライバシーポリシーと利用規約に同意します</Checkbox>
          </Form.Item>
          <Form.Item className="flex justify-center">
            <Button
              className="px-8 bg-primary"
              type="primary"
              htmlType="submit"
            >
              作成
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
