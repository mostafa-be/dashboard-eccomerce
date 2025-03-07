import { ChevronDown } from "lucide-react";
import React from "react";

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return <section className={` ${className} `}>{children}</section>;
};
export const HeaderCard = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return <div className={` ${className} `}>{children}</div>;
};
interface TitleCardProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export const TitleCard: React.FC<TitleCardProps> = ({ title, className }) => {
  return (
    <h5
      className={`${className} text-xl font-[500] text-gray-900 dark:text-white`}
    >
      {title}
    </h5>
  );
};

interface SelectorPeriodProps {
  period: string;
  setPeriod: (period: string) => void;
}

export const SelectorPeriod: React.FC<SelectorPeriodProps> = ({
  period,
  setPeriod,
}) => {
  const periods = ["wekly", "monthly", "yearly"];
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="w-32 z-20 py-2 px-3 flex items-center cursor-pointer justify-between relative bg-transparent shadow rounded-lg border border-gray-500/90"
    >
      <span className="text-sm font-normal text-gray-900 dark:text-white capitalize ">
        {period === "wekly" ? "Last 7 Days" : period}
      </span>
      <ChevronDown size={15} className="text-gray-900 dark:text-white" />
      {isOpen && (
        <div className="absolute overflow-hidden top-14 left-0 w-full rounded-lg bg-white dark:bg-black-100/90 shadow flex-col border border-gray-500/90">
          {periods &&
            periods.map((time, i) => {
              return (
                <div
                  onClick={() => setPeriod(time)}
                  key={i}
                  className={`hover:bg-gray-300/50 px-3 py-2.5 ${
                    i > 0 && "border-t border-gray-500/90"
                  } ${period === time ? "bg-gray-300/60" : "bg-transparent"} `}
                >
                  <span className="text-sm text-gray-900 dark:text-white capitalize ">
                    {time === "wekly" ? "Last 7 Days" : time}
                  </span>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({
  children,
  className,
}) => {
  return <div className={` ${className}`}>{children}</div>;
};

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className,
}) => {
  return <div className={` ${className}`}>{children}</div>;
};
