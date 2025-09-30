const { PrismaClient } = require('../generated/prisma');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'admin@usm.cl';
  const password = await bcrypt.hash('Admin123!', 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    create: { email: adminEmail, password, name: 'Admin', role: 'ADMIN' },
    update: {},
  });

  // Sample content
  await prisma.news.createMany({
    data: [
      { title: 'Noticia 1', description: 'Detalle 1', url: 'noticia-1', image: '/img/n1.jpg', category: 'Eventos' },
      { title: 'Noticia 2', description: 'Detalle 2', url: 'noticia-2', image: '/img/n2.jpg', category: 'Investigación' },
    ],
    skipDuplicates: true,
  });

  const now = new Date();
  await prisma.event.createMany({
    data: [
      { title: 'Evento A', description: 'Desc A', date: now, hour: '10:00', modality: 'PRESENCIAL', image: '/img/e1.jpg' },
      { title: 'Evento B', description: 'Desc B', date: new Date(now.getTime() + 86400000), hour: '16:00', modality: 'VIRTUAL', image: '/img/e2.jpg' },
    ],
    skipDuplicates: true,
  });

  await prisma.gallery.createMany({
    data: [
      { title: 'Foto 1', url: '/gal/1.jpg', category: 'EVENTOS' },
      { title: 'Foto 2', url: '/gal/2.jpg', category: 'ESTUDIANTES' },
    ],
    skipDuplicates: true,
  });

  console.log('Seed completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });