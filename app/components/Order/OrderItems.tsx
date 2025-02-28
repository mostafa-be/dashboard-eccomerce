import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import CardOrderItem from "./CardOrderItem";

type OrderItem = {
  product: {
    title: string;
  };
  color: {
    name: string;
    code: string;
  };
  size: {
    name: string;
  };
  quantity: number;
  price: number;
};

type OrderItemsProps = {
  orderItems: OrderItem[];
};

const OrderItems = ({ orderItems }: OrderItemsProps) => {
  return (
    <div className="w-full mt-5">
      <h5 className="text-xl font-semibold text-black dark:text-white">
        Order Items
      </h5>
      <div className="w-full mt-5 px-10">
        <Carousel
          opts={{
            align: "center",
          }}
          className="w-full"
        >
          <CarouselContent>
            {orderItems.map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                <CardOrderItem item={item} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default OrderItems;
