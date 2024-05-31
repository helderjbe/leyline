import React from "react";
import { Settlement } from "@prisma/client";

interface SettlementResponseProps {
  settlement: Settlement;
}

const SettlementResponse: React.FC<SettlementResponseProps> = ({
  settlement,
}) => {
  return (
    <div className="mt-4 p-4 bg-gray-100 rounded-md">
      <p className="text-lg font-semibold">
        Party B's response to current settlement:
      </p>
      <p>Status: {settlement.status}</p>
      <p>Amount: {settlement.amount}</p>
    </div>
  );
};

export default SettlementResponse;
