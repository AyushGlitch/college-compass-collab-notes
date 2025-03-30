import { VercelRequest, VercelResponse } from '@vercel/node';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    const { creatorId, roomName } = req.query;

    if (typeof creatorId !== 'string' || typeof roomName !== 'string') {
      res.status(400).json({ error: 'Invalid query parameters.' });
      return;
    }

    try {
      const document = await prisma.document.upsert({
        where: { creatorId_roomName: { creatorId, roomName } },
        update: {},
        create: { creatorId, roomName, content: '' }, // Initialize with empty content or default content
      });

      res.status(200).json(document);
    } catch (error) {
      console.error('Error during upsert operation:', error);
      res.status(500).json({ error: 'Failed to process document.' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
