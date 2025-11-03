const express = require('express');
const prisma = require('../prismaClient');
const { requireAuth, requireAdmin } = require('./_authMiddleware');

const router = express.Router();

router.get('/', async (_req, res) => {
  const items = await prisma.gallery.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(items);
});

router.get('/category/:category', async (req, res) => {
  const items = await prisma.gallery.findMany({
    where: { category: req.params.category.toUpperCase() },
    orderBy: { createdAt: 'desc' }
  });
  res.json(items);
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const item = await prisma.gallery.findUnique({ where: { id } });
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
});

router.post('/',  async (req, res) => {
  try {
    const created = await prisma.gallery.create({ data: req.body });
    res.status(201).json(created);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.put('/:id',  async (req, res) => {
  try {
    const id = Number(req.params.id);
    const updated = await prisma.gallery.update({ where: { id }, data: req.body });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.delete('/:id',  async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.gallery.delete({ where: { id } });
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});



module.exports = router;