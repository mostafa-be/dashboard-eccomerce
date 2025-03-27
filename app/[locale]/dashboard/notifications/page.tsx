import NotificationsPage from "@/app/components/Notifications/NotificationsPage";
import Heading from "@/utils/Heading";
import React from "react";

const page = () => {
  return (
    <>
      <Heading title="Notifications" keywords="Notifications" description="Notifications" />
      <NotificationsPage />
    </>
  );
};

export default page;
