import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse) {
    res.status(200).json([1, 2, 3, 4, 5]);
}