const express = require('express');
const prisma = require('../prismaClient');
const { requireAuth, requireAdmin } = require('./_authMiddleware');

const router = express.Router();

// Helper: simple slugify (lowercase, alnum and hyphens)
function slugify(text) {
  return String(text)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/\s+/g, '-') // spaces to -
    .replace(/[^a-z0-9-_]/g, '') // remove invalid chars
    .replace(/-+/g, '-') // collapse dashes
    .replace(/^-+|-+$/g, ''); // trim dashes
}

// Ensure slug uniqueness by appending a numeric suffix if needed
async function generateUniqueSlug(base, excludeId = null) {
  let slug = slugify(base);
  let candidate = slug;
  let i = 1;
  while (true) {
    const where = { url: candidate };
    if (excludeId) where.id = { not: excludeId };
    const existing = await prisma.event.findFirst({ where });
    if (!existing) return candidate;
    candidate = `${slug}-${i++}`;
  }
}

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

router.post('/', async (req, res) => {
  try {
    const data = { ...req.body };
    // Generate url if not provided
    if (!data.url && data.title) {
      data.url = await generateUniqueSlug(data.title);
    }
    const created = await prisma.event.create({ data });
    res.status(201).json(created);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const body = { ...req.body };
    // If url not provided but title changed, regenerate unique slug
    if (!body.url && body.title) {
      body.url = await generateUniqueSlug(body.title, id);
    }
    const updated = await prisma.event.update({ where: { id }, data: body });
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

router.get('/getEventByUrl/:url', async (req, res) => {
  const url = req.params.url;
  const event = await prisma.event.findUnique({ where: { url } });
  if (!event) return res.status(404).json({ message: 'Not found' });
  res.json(event);
});

module.exports = router;