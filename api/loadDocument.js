import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { creatorId, roomName } = req.query;

  if (!creatorId || !roomName) {
    return res.status(400).json({ error: 'Missing creatorId or roomName' });
  }

  try {
    const document = await prisma.document.upsert({
      where: { creatorId_roomName: { creatorId, roomName } },
      update: {}, // No fields to update if the document exists
      create: {
        creatorId,
        roomName,
        content: '', // Initialize with empty content or default value
      },
    });

    res.status(200).json(document);
  } catch (error) {
    console.error('Error in upsert operation:', error);
    res.status(500).json({ error: 'Failed to load or create document.' });
  }
}
