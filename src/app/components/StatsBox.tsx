import React from "react";

type StatsBoxProps = {
  title: string;
  value: number;
  icon?: React.ReactNode;
};

const StatsBox: React.FC<StatsBoxProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-indigo-100 dark:bg-indigo-900 p-4 rounded-md shadow-md flex items-center space-x-4">
      {icon}
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-300">{title}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </div>
  );
};

export default StatsBox;
