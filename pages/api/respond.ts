import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../clients/prisma";
import { pusherServer } from "../../clients/pusherServer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { status } = req.body;
    const settlement = await prisma.settlement.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (settlement && settlement.status === "pending") {
      const updatedSettlement = await prisma.settlement.create({
        data: { status, amount: settlement.amount },
      });

      await pusherServer.trigger("settlement-channel", "response", {
        settlement: updatedSettlement,
      });

      res.status(200).json(updatedSettlement);
    } else {
      res.status(404).json({ error: "No settlement found or not available" });
    }
  } else {
    res.status(405).end();
  }
}
