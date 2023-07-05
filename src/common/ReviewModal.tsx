import React from "react";
import { useState } from "react";
import { Button, Modal, Rate, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import axiosJWT from "@/api/axiosJWT";
type ReviewModalProps = {
  name: string;
  id: string;
  updateComment: (comment: any) => void;
  type: string;
};

const ReviewModal = ({ name, id, updateComment, type }: ReviewModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [rating, setRating] = useState(0);
  const [reviewContent, setReviewContent] = useState("");
  const handleChange = (value: number) => {
    setRating(value);
  };

  const clearForm = () => {
    setRating(0);
    setReviewContent("");
  };

  const postComment = async () => {
    try {
      const apiURL =
        type === "restaurant"
          ? "http://localhost:3008/api/reviews/restaurants/" + id
          : "http://localhost:3008/api/reviews/foods/" + id;
      const response = await axiosJWT.post(apiURL, {
        rate: rating,
        content: reviewContent,
      });
      if (response.status === 201) {
        console.log(response.data);
        updateComment(response.data);
        clearForm();
        message.success("レビューを書きました");
      } else {
        message.error("レビューを書くに失敗しました");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal} icon={<EditOutlined />}>
        レビューを書く
      </Button>
      <Modal
        // title="Basic Modal"
        open={isModalOpen}
        onOk={() => {
          postComment();
          handleOk();
        }}
        onCancel={handleCancel}
        centered
      >
        <div className="flex flex-col">
          <div className="text-3xl font-bold flex justify-center">
            <span>レビューを書く</span>
          </div>
          <div className="flex justify-center">
            <Rate
              defaultValue={rating}
              onChange={handleChange}
              style={{ fontSize: 30 }}
            />
          </div>
          <div className="mt-5">
            <TextArea
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
              placeholder="レビューを書いてください"
              autoSize={{ minRows: 3, maxRows: 6 }}
              required
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ReviewModal;
