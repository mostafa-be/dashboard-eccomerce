export const handlePageInfoChange = (data: {
  title: string;
  subTitle: string;
}) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("pageInfo", JSON.stringify(data));
  }
};

export const getPageInfo = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("pageInfo") || "{}");
  }
};