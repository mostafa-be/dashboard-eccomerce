import React, { useState } from "react";
import {
  useAddReplyReviewMutation,
  useAddReviewMutation,
} from "@/redux/features/products/productsApi";
import { Star, MessageSquare } from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import toast from "react-hot-toast";

type IComment = {
  user: {
    name: string;
    email: string;
    isVerified: boolean;
  };
  comment: string;
  commentReplies?: IComment[];
  _id: string;
};

type ReplyCommentProductProps = {
  reviews: {
    user: { name: string; email: string; isVerified: boolean };
    rating: number;
    review: string;
    commentReplies: IComment[];
    _id: string;
  }[];
  ratings?: number;
  productId: string;
  refetch: () => void;
};

const ReplyCommentProduct = ({
  reviews,
  productId,
  refetch,
}: ReplyCommentProductProps) => {
  const [addReview, { isLoading: isAddingReview }] = useAddReviewMutation();
  const [addReplyReview, { isLoading: isAddingReply }] =
    useAddReplyReviewMutation();
  const [newReview, setNewReview] = useState({ rating: 0, review: "" });
  const [reply, setReply] = useState({ comment: "", reviewId: "" });

  const handleAddReview = async () => {
    if (newReview.rating > 0 && newReview.review.trim()) {
      try {
        await addReview({ id: productId, data: newReview }).unwrap();
        refetch();
        toast.success("Review added successfully!");
        setNewReview({ rating: 0, review: "" });
      } catch {
        toast.error("Failed to add review. Please try again.");
      }
    } else {
      toast.error("Please provide a rating and review.");
    }
  };

  const handleAddReply = async () => {
    if (reply.comment.trim()) {
      try {
        await addReplyReview({
          comment: reply.comment,
          productId,
          reviewId: reply.reviewId,
        }).unwrap();
        toast.success("Reply added successfully!");
        setReply({ comment: "", reviewId: "" });
        refetch();
      } catch {
        toast.error("Failed to add reply. Please try again.");
      }
    } else {
      toast.error("Please write a reply.");
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Add Review Section */}
      <div className="bg-white dark:bg-black-100 shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Add a Review
        </h3>
        <div className="mt-4 space-y-4">
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                size={24}
                className={`cursor-pointer ${
                  index < newReview.rating
                    ? "text-yellow-500"
                    : "text-gray-300 dark:text-gray-600"
                }`}
                onClick={() =>
                  setNewReview({ ...newReview, rating: index + 1 })
                }
              />
            ))}
          </div>
          <Textarea
            placeholder="Write your review..."
            value={newReview.review}
            onChange={(e) =>
              setNewReview({ ...newReview, review: e.target.value })
            }
            className="w-full"
          />
          <div className="w-full flex items-center justify-end">
            <Button
              onClick={handleAddReview}
              disabled={isAddingReview}
              className={`bg-blue-600 hover:bg-blue-700 text-white ${
                isAddingReview ? "cursor-progress" : "cursor-pointer"
              }`}
            >
              {isAddingReview ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Customer Reviews
        </h3>
        {reviews &&
          reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white dark:bg-black-100 shadow rounded-lg p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    {review.user.name}
                  </h4>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < review.rating
                            ? "text-yellow-500"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {review.review}
                </span>
              </div>
              {/* Replies */}
              <div className="space-y-4 pl-6 border-l border-gray-300 dark:border-gray-700">
                {review.commentReplies.map((reply, replyIndex) => (
                  <div
                    key={replyIndex}
                    className="flex items-start gap-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-md"
                  >
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                      {reply.user.name}:
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {reply.comment}
                    </span>
                  </div>
                ))}
                {/* Reply Icon */}
                <div className="flex items-center gap-2">
                  <MessageSquare
                    size={20}
                    className="cursor-pointer text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                    onClick={() =>
                      setReply({ comment: "", reviewId: review._id })
                    }
                  />
                  {reply.reviewId === review._id && (
                    <div className="flex items-center gap-2 w-full">
                      <Textarea
                        placeholder="Write a reply..."
                        value={reply.comment}
                        onChange={(e) =>
                          setReply({
                            comment: e.target.value,
                            reviewId: review._id,
                          })
                        }
                        className="flex-1"
                      />
                      <Button
                        onClick={handleAddReply}
                        disabled={isAddingReply}
                        className={`bg-blue-600 hover:bg-blue-700 text-white ${
                          isAddingReply ? "cursor-progress" : "cursor-pointer"
                        }`}
                      >
                        {isAddingReply ? "Replying..." : "Reply"}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ReplyCommentProduct;
