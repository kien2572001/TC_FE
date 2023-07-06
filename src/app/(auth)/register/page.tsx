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
        content: "登録成功！",
      });
      router.push("/login");
    } else {
      messageApi.open({
        type: "error",
        content: "登録に失敗した！",
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
            label="ユーザー名"
            name="name"
            rules={[{ required: true, message: "ユーザー名を入力してください！" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Eメール"
            name="email"
            rules={[
              {
                type: "email",
                message: "入力が有効なEメールではありません！",
              },
              {
                required: true,
                message: "Eメールを入力してください！",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="パスワード"
            name="password"
            rules={[{ required: true, message: "パスワードを入力してください！" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="パスワードの確認"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "パスワードを確認してください！" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "入力した2つのパスワードが一致しません！"
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
                    : Promise.reject(new Error("合意を受け入れるべきである")),
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
