import { Faq } from "@/app/@types/types";
import {
  useDeleteFaqMutation,
  useEditFaqMutation,
} from "@/redux/features/faqs/faqsApi";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

/**
 * CardFaq Component
 * Displays a single FAQ with options to view, edit, or delete it.
 *
 * @param {Props} props - The component props.
 * @param {Faq} props.faq - The FAQ data to display.
 * @returns {JSX.Element} The rendered FAQ card component.
 */
type Props = {
  faq: Faq;
  refetch: () => void;
};

const CardFaq = ({ faq, refetch }: Props) => {
  const { _id, question, answer } = faq;
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState(question);
  const [editedAnswer, setEditedAnswer] = useState(answer);

  const [editFaq, { isLoading: isEditingFaq }] = useEditFaqMutation();
  const [deleteFaq, { isLoading: isDeletingFaq }] = useDeleteFaqMutation();

  // Handle updating the FAQ
  const handleUpdate = async () => {
    try {
      await editFaq({
        id: _id,
        data: { question: editedQuestion, answer: editedAnswer },
      }).unwrap();
      toast.success("FAQ updated successfully!");
      refetch();
      setIsEditing(false);
    } catch {
      toast.error("Failed to update FAQ. Please try again.");
    }
  };

  // Handle deleting the FAQ
  const handleDelete = async () => {
    try {
      await deleteFaq(_id).unwrap();
      refetch();
      toast.success("FAQ deleted successfully!");
    } catch {
      toast.error("Failed to delete FAQ. Please try again.");
    }
  };

  return (
    <li className="border rounded-lg p-4 shadow-sm bg-gray-50 dark:bg-black-200">
      {isEditing ? (
        <div className="space-y-4">
          {/* Edit Mode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Question
            </label>
            <Input
              value={editedQuestion}
              onChange={(e) => setEditedQuestion(e.target.value)}
              placeholder="Edit the question"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-white">
              Answer
            </label>
            <Textarea
              value={editedAnswer}
              onChange={(e) => setEditedAnswer(e.target.value)}
              placeholder="Edit the answer"
              className="w-full"
            />
          </div>
          <div className="flex items-center justify-end space-x-2">
            <Button
              className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-md"
              onClick={() => setIsEditing(false)}
              disabled={isEditingFaq}
            >
              Cancel
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md"
              onClick={handleUpdate}
              disabled={isEditingFaq}
            >
              {isEditingFaq ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          {/* View Mode */}
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100">
            Q: {question}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">A: {answer}</p>
          <div className="flex items-center justify-end space-x-2 mt-4">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md"
              onClick={handleDelete}
              disabled={isDeletingFaq}
            >
              {isDeletingFaq ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      )}
    </li>
  );
};

export default CardFaq;
