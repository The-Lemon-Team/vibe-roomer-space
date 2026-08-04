import { PrismaClient, Role } from '../src/generated/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const ADMIN_EMAIL = 'admin@viberoom.net';
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'AdminVibe2026!';

async function main() {
  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

  const admin = await prisma.user.upsert({
    where: { email: ADMIN_EMAIL },
    update: {
      username: ADMIN_USERNAME,
      password: hashedPassword,
      role: Role.ADMIN,
    },
    create: {
      email: ADMIN_EMAIL,
      username: ADMIN_USERNAME,
      password: hashedPassword,
      role: Role.ADMIN,
    },
    select: {
      id: true,
      email: true,
      username: true,
      role: true,
      createdAt: true,
    },
  });

  console.log('Seeded admin user:');
  console.log(JSON.stringify(admin, null, 2));
  console.log('--- credentials ---');
  console.log(`email:    ${ADMIN_EMAIL}`);
  console.log(`username: ${ADMIN_USERNAME}`);
  console.log(`password: ${ADMIN_PASSWORD}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
