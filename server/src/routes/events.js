const express = require('express');
const prisma = require('../prismaClient');
const { requireAuth, requireAdmin } = require('./_authMiddleware');

const router = express.Router();

router.get('/', async (_req, res) => {
  const events = await prisma.event.findMany({ orderBy: { date: 'asc' } });
  res.json(events);
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const event = await prisma.event.findUnique({ where: { id } });
  if (!event) return res.status(404).json({ message: 'Not found' });
  res.json(event);
});

router.post('/', requireAuth, requireAdmin, async (req, res) => {
  try {
    const created = await prisma.event.create({ data: req.body });
    res.status(201).json(created);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.put('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const updated = await prisma.event.update({ where: { id }, data: req.body });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.event.delete({ where: { id } });
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.get('/getUpcomingEvents/:n', async (req, res) => {
  const n = Number(req.params.n);
  const today = new Date();
  const events = await prisma.event.findMany({
    where: { date: { gte: today } },
    orderBy: { date: 'asc' },
    take: n,
  });
  res.json(events);
});

module.exports = router;