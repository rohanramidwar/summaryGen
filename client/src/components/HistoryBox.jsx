import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const HistoryBox = () => {
  const navigate = useNavigate();
  const { smmries, isLoading } = useSelector((state) => state?.smmry);

  return (
    <div className="flex flex-col gap-3 items-center text-slate-900">
      <p className="font-medium uppercase">History</p>
      {isLoading ? (
        <div className="animate-pulse">Loading..</div>
      ) : (
        <div className="px-3 sm:px-0 sm:w-1/3 flex flex-col gap-3">
          {!smmries.length && <p className="text-center">No history found!</p>}
          {smmries.map((smmry) => (
            <div className="border border-gray-900 p-3 rounded-sm">
              <p>{smmry.smmry}</p>
              <p className="text-end text-xs italic">
                {moment(smmry?.createdAt)?.fromNow()}
              </p>
            </div>
          ))}
        </div>
      )}
      <Button onClick={() => navigate("/")}>Back</Button>
    </div>
  );
};

export default HistoryBox;
