import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@viberoomer.com';
  const username = 'admin';
  const rawPassword = 'AdminVibe2026!';

  const hashedPassword = await bcrypt.hash(rawPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      username,
      role: Role.ADMIN,
      password: hashedPassword,
    },
    create: {
      email,
      username,
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });

  console.log('--- ADMIN CREATED / UPDATED ---');
  console.log(`Email: ${admin.email}`);
  console.log(`Username: ${admin.username}`);
  console.log(`Role: ${admin.role}`);
  console.log(`Password: ${rawPassword}`);
  console.log('-------------------------------');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
