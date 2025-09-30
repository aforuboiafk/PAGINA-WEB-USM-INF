const express = require('express');
const prisma = require('../prismaClient');
const { requireAuth, requireAdmin } = require('./_authMiddleware');

const router = express.Router();

// GET all
router.get('/', async (_req, res) => {
  const items = await prisma.news.findMany({ orderBy: { date: 'desc' } });
  res.json(items);
});

// GET by id
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const item = await prisma.news.findUnique({ where: { id } });
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
});

// CREATE
router.post('/', requireAuth, requireAdmin, async (req, res) => {
  try {
    const created = await prisma.news.create({ data: req.body });
    res.status(201).json(created);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// UPDATE
router.put('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const updated = await prisma.news.update({ where: { id }, data: req.body });
    res.json(updated);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// DELETE
router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.news.delete({ where: { id } });
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.get('/getLastNews/:n', async (req, res) => {
  const n = Number(req.params.n);
  if (isNaN(n) || n <= 0) {
    return res.status(400).json({ message: 'Invalid number' });
  }
  const items = await prisma.news.findMany({
    orderBy: { date: 'desc' },
    take: n,
  });
  res.json(items);
});

router.get('/getByUrl/:url', async (req, res) => {
  const url = req.params.url;
  const item = await prisma.news.findUnique({ where: { url } });
  if (!item) return res.status(404).json({ message: 'Not found' });
  res.json(item);
});

router.get('/adjacent/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ message: 'Invalid id' });

  try {
    const current = await prisma.news.findUnique({
      where: { id },
      select: { id: true, date: true }
    });
    if (!current) return res.status(404).json({ message: 'Not found' });

    const [previous, next] = await Promise.all([
      prisma.news.findFirst({
        where: {
          date: { lt: current.date },
          OR: [{ date: current.date, id: { lt: current.id } }]
        },
        orderBy: [{ date: 'desc' }, { id: 'desc' }]
      }),
      prisma.news.findFirst({
        where: {
          date: { gt: current.date },
          OR: [{ date: current.date, id: { gt: current.id } }]
        },
        orderBy: [{ date: 'asc' }, { id: 'asc' }]
      })
    ]);

    res.json([previous ?? null, next ?? null]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;