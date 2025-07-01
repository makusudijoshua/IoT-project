import { ReactNode } from "react";

type CardProps = {
  title: string;
  currentReading: string;
  latestReading: string;
  icon: ReactNode;
};

const Card = ({ title, currentReading, latestReading, icon }: CardProps) => {
  return (
    <div className="p-8 rounded-xl bg-white shadow-md w-1/3">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl text-blue-500">{icon}</span>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          <p>Current Reading</p>
          <span>{currentReading}</span>
        </div>
        <div className="space-y-2">
          <p>Last Reading</p>
          <span>{latestReading}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
