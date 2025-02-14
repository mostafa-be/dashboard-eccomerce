import React from "react";

type Props = {
  name: string;
};

const AvatarGenerator = ({ name }: Props) => {
  const avatar = name.slice(0, 1);
  const DIGITS: string = "0123456789ABCDEF";

  const randomColor = (): string => {
    let result = "";
    for (let i = 0; i < 6; ++i) {
      const index = Math.floor(16 * Math.random());
      result += DIGITS[index];
    }
    return "#" + result;
  };
  const color =randomColor()
  return (
    <div
      className={`w-10 h-10 flex items-center justify-center rounded-full `}
      style={{backgroundColor:color}}
  
    >
      <h6 className="text-white text-lg font-semibold">{avatar}</h6>
    </div>
  );
};

export default AvatarGenerator;
