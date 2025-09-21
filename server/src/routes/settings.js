const express = require('express');
const prisma = require('../prismaClient');
const { requireAuth, requireAdmin } = require('./_authMiddleware');

const router = express.Router();

// GET all settings
router.get('/', async (_req, res) => {
  const settings = await prisma.setting.findMany({ orderBy: { key: 'asc' } });
  res.json(settings);
});

// GET one
router.get('/:key', async (req, res) => {
  const setting = await prisma.setting.findUnique({ where: { key: req.params.key } });
  if (!setting) return res.status(404).json({ message: 'Not found' });
  res.json(setting);
});

// UPSERT
router.put('/:key', requireAuth, requireAdmin, async (req, res) => {
  const { value } = req.body;
  const updated = await prisma.setting.upsert({
    where: { key: req.params.key },
    create: { key: req.params.key, value: String(value ?? '') },
    update: { value: String(value ?? '') }
  });
  res.json(updated);
});

module.exports = router;