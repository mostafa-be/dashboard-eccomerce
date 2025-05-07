import { Blog } from "@/app/@types/types";
import React from "react";
import { Card, CardContent, HeaderCard, TitleCard } from "../ui/card";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Eye, ThumbsDown, ThumbsUp } from "lucide-react";

type Props = {
  blog: Blog;
};

/**
 * BlogDetails Component
 * Displays detailed information about a blog post, including title, description,
 * author, views, likes, dislikes, category, tags, and thumbnail.
 *
 * @param {Props} props - The component props.
 * @param {Blog} props.blog - The blog data to display.
 * @returns {JSX.Element} The rendered blog details component.
 */
const BlogDetails = ({ blog }: Props) => {
  const {
    title,
    description,
    subDescription,
    likes,
    dislikes,
    thumbnail,
    numViews,
    author,
    createdAt,
    tags,
    category,
  } = blog;
  const { name, avatar } = author || {};

  return (
    <Card className="w-full space-y-6 bg-white dark:bg-black-100 shadow rounded-lg p-6">
      <HeaderCard className="w-full">
        <TitleCard title="Blog Details" />
      </HeaderCard>
      <CardContent className="w-full space-y-4">
        {/* Blog Title */}
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 capitalize">
          {title}
        </h2>

        {/* Blog Sub-description */}
        <p className="text-gray-600 dark:text-gray-300 text-[16px] font-[400]">
          {subDescription}
        </p>

        {/* Blog Thumbnail */}
        <div className="w-full flex items-center justify-center">
          {thumbnail ? (
            <Image
              src={thumbnail?.url}
              alt={"thumbnail blog :" + title}
              width={500}
              height={300}
              className="w- md:w-96 lg:max-w-md xl:max-w-lg h-auto rounded-lg object-cover"
            />
          ) : (
            <div className="flex items-center justify-center w-full md:w-[500px] rounded-lg bg-gray-500/50 h-96">
              <p className="dark:text-white text-lg">No Image Available</p>
            </div>
          )}
        </div>

        {/* Author and Created Date */}
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar>
              {avatar ? (
                <AvatarImage src={avatar.url} alt={name} />
              ) : (
                <AvatarFallback>
                  {name.toUpperCase().slice(0, 1)}
                </AvatarFallback>
              )}
            </Avatar>
            <h3 className="text-[16px] font-[500] text-gray-800 dark:text-gray-100 capitalize">
              <span className="text-gray-900 dark:text-white font-normal">
                Written by
              </span>{" "}
              {name}
            </h3>
          </div>
          <div className="flex items-center md:flex-col gap-2">
            <p className="text-[16px] font-[500] text-gray-800 dark:text-gray-100 capitalize">
              {new Date(createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Views, Likes, and Dislikes */}
        <div className="w-full flex items-center justify-between text-gray-800 dark:text-gray-100">
          <div className="flex items-center gap-4">
            <p className="flex items-center gap-1">
              <Eye size={15} /> {numViews} Views
            </p>
            <p className="flex items-center gap-1">
              <ThumbsUp size={15} /> {likes?.length} Likes
            </p>
            <p className="flex items-center gap-1">
              <ThumbsDown size={15} /> {dislikes?.length} Dislikes
            </p>
          </div>
        </div>

        {/* Category and Tags */}
        <div className="w-full space-y-2">
          <p className="text-[16px] font-[500] text-gray-800 dark:text-gray-100">
            <span className="font-semibold">Category:</span> {category.name}
          </p>
          <div className="w-full flex items-center flex-wrap gap-2">
            <p className="text-[16px] font-[500] text-gray-800 dark:text-gray-100">
              Tags:
            </p>
            <div className="flex items-center flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag._id}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-2 py-1 rounded-full text-sm font-medium"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Description */}
        <div className="w-full">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Description:
          </h3>
          <div
            className="text-gray-600 dark:text-gray-300 text-[16px] font-[400] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogDetails;
