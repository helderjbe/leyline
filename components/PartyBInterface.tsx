import React, { useState, useEffect } from "react";
import { pusherClient } from "../clients/pusherClient";
import { Settlement } from "@prisma/client";

const PartyBInterface: React.FC = () => {
  const [settlement, setSettlement] = useState<Settlement | null>(null);

  useEffect(() => {
    const fetchSettlement = async () => {
      try {
        const response = await fetch("/api/settlement");
        if (response.ok) {
          const data = await response.json();
          setSettlement(data);
        }
      } catch (error) {
        console.error("Error fetching settlement:", error);
      }
    };

    fetchSettlement();

    const channel = pusherClient.subscribe("settlement-channel");

    channel.bind("update", (data: { settlement: Settlement }) => {
      setSettlement(data.settlement);
    });

    return () => {
      pusherClient.unsubscribe("settlement-channel");
    };
  }, []);

  const handleResponse = async (status: "agreed" | "disputed") => {
    const response = await fetch("/api/respond", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (response.ok) {
      setSettlement(null);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Party B Interface</h1>
      {settlement && settlement.status === "pending" ? (
        <div>
          <p>Settlement Amount: ${settlement.amount}</p>
          <button
            className="bg-green-500 text-white px-4 py-2 mr-2"
            onClick={() => handleResponse("agreed")}
          >
            Agree
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2"
            onClick={() => handleResponse("disputed")}
          >
            Dispute
          </button>
        </div>
      ) : (
        <p>No settlement proposal to review at the moment.</p>
      )}
    </div>
  );
};

export default PartyBInterface;
