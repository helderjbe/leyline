import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../clients/prisma";
import { pusherServer } from "../../clients/pusherServer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { amount } = req.body;
    const settlement = await prisma.settlement.create({
      data: {
        amount,
        status: "pending",
      },
    });

    await pusherServer.trigger("settlement-channel", "update", {
      settlement,
    });

    res.status(200).json(settlement);
  } else {
    res.status(405).end();
  }
}
