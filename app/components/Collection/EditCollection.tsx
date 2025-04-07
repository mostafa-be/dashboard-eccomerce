"use client";

import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import toast from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Card, CardContent, HeaderCard, TitleCard } from "../ui/card";

import Image from "next/image";
import { ImageUp } from "lucide-react";
import { useEditCollectionMutation } from "@/redux/features/collections/collectionsApi";
type EditCollectionProps = {
  collection: {
    _id: string;
    name: string;
    thumbnail: {
      url: string;
      public_id: string;
    };
  };
  refetch: () => void;
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const EditCollection = ({
  collection,
  refetch,
  editMode,
  setEditMode,
}: EditCollectionProps) => {
  const { _id, name, thumbnail } = collection;
  const [editThumbnail, setEditThumbnail] = React.useState<string | ArrayBuffer | null>(
    null
  );
  const [dragging, setDragging] = React.useState(false);
  const [editCollection, { isLoading, isSuccess, error }] = useEditCollectionMutation();
  const initialValues = {
    name: name,
    thumbnail: thumbnail,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("collection name is required"),
  });

  const handleSubmit = async (
    values: { name: string },
    { resetForm }: { resetForm: () => void }
  ) => {
    if (!isLoading) {
      const data = {
        ...values,
        thumbnail: editThumbnail ? editThumbnail : thumbnail ? thumbnail : null,
      };
      await editCollection({ id: _id, data }).unwrap();
      resetForm();
    }
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        setEditThumbnail(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setEditThumbnail(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Collection updated successfully!");
      refetch();
      setEditMode(!editMode);
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as { data: { message: string } };
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  return (
    <Card className="w-full bg-white dark:bg-black-100 shadow rounded-lg p-5">
      <HeaderCard className="w-full  flex items-center justify-between">
        <TitleCard
          title="Edit Collection Blog"
          className="text-xl font-semibold text-black dark:text-white"
        />
      </HeaderCard>
      <CardContent className="w-full space-y-4">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="mt-5">
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2">
                Collection Name
              </label>
              <Field
                name="name"
                type="text"
                as={Input}
                placeholder="Enter Collection name"
                className="w-full"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
           <div className="mb-4">
              <input
                type="file"
                accept="image/*"
                id="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <label
                htmlFor="file"
                className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
                  dragging ? "bg-blue-500" : "bg-transparent"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {editThumbnail ? (
                  <Image
                    src={editThumbnail as string}
                    title="selected image from clipboard..."
                    alt="Selected"
                    layout="responsive"
                    width={500}
                    height={500}
                    className="max-h-full w-full object-cover"
                  />
                ) : thumbnail ? (
                  <Image
                    src={thumbnail?.url}
                    alt="Selected"
                    layout="responsive"
                    width={500}
                    height={500}
                    className="max-h-full w-full object-cover"
                  />
                ) : (
                  <div className="w-full px-5 py-5 flex flex-col items-center justify-center">
                    <ImageUp
                      size={60}
                      className="text-gray-800 dark:text-white rotate-180"
                    />
                    <span className="text-gray-800 dark:text-white">
                      Drag and drop your thumbnail here or click to browse
                    </span>
                  </div>
                )}
              </label>
            </div>
            <div className="w-full flex items-center justify-end">
              <Button
                type="submit"
                className={`bg-blue-650 hover:bg-blue-600 text-white ${
                  isLoading ? " cursor-progress" : " cursor-pointer"
                } min-w-32`}
                disabled={isLoading}
              >
                {isLoading ? "Updating...." : "Update Collection"}
              </Button>
            </div>
          </Form>
        </Formik>
      </CardContent>
    </Card>
  );
};

export default EditCollection;
