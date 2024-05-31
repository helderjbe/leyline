import React, { useState, useEffect } from "react";
import SettlementForm from "./SettlementForm";
import SettlementResponse from "./SettlementResponse";
import Notification from "./Notification";
import { pusherClient } from "../clients/pusherClient";
import { Settlement } from "@prisma/client";

const PartyAInterface: React.FC = () => {
  const [settlement, setSettlement] = useState<Settlement | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

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

    channel.bind("response", () => {
      setNotification("Party B has responded to your settlement.");
    });

    return () => {
      pusherClient.unsubscribe("settlement-channel");
    };
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Party A Interface</h1>
      {notification && <Notification message={notification} />}
      <SettlementForm settlement={settlement} setSettlement={setSettlement} />
      {settlement && <SettlementResponse settlement={settlement} />}
    </div>
  );
};

export default PartyAInterface;
