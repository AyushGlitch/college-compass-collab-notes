import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { creatorId, roomName, content } = req.body;
    try {
      const document = await prisma.document.upsert({
        where: { creatorId_roomName: { creatorId, roomName } },
        update: { content },
        create: { creatorId, roomName, content },
      });
      res.status(200).json(document);
    } catch (error) {
      res.status(500).json({ error: 'Failed to save document.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
