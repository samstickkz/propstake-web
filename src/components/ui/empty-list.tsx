import React from "react";
import { CiBoxList } from "react-icons/ci";

interface ItemProps {
  desc?: string;
}
const EmptyList: React.FC<ItemProps> = ({ desc }) => {
  return (
    <div className="flex flex-col items-center justify-center py-6 w-full">
      <div className="flex flex-col items-center justify-center">
        <p className="text-sm text-strokedark/60 text-center">{desc}</p>
        <CiBoxList className="text-strokedark/60 text-center text-[60px] mt-4" />
      </div>
    </div>
  );
};

export default EmptyList;
