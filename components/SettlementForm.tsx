import React, { useState } from "react";
import { Settlement } from "@prisma/client";

interface SettlementFormProps {
  settlement: Settlement | null;
  setSettlement: (settlement: Settlement) => void;
}

const SettlementForm: React.FC<SettlementFormProps> = ({
  settlement,
  setSettlement,
}) => {
  const [amount, setAmount] = useState<number>(
    settlement ? settlement.amount : 0
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    });

    if (response.ok) {
      const newSettlement = await response.json();
      setSettlement(newSettlement);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <label className="block text-sm font-medium text-gray-700">
        Settlement Amount
      </label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
      />
      <button
        type="submit"
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Submit
      </button>
    </form>
  );
};

export default SettlementForm;
