import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../clients/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const settlement = await prisma.settlement.findFirst({
        orderBy: {
          createdAt: "desc",
        },
      });

      res.status(200).json(settlement);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).end();
  }
}
