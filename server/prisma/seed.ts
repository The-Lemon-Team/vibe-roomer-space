import { PrismaClient, Role, ActivityContext } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('secretpassword', 10);

  // 1. Seed Users
  const cyberJunkie = await prisma.user.upsert({
    where: { email: 'cyber_junkie@viberoom.net' },
    update: {},
    create: {
      id: 'cyber-junkie-id',
      email: 'cyber_junkie@viberoom.net',
      username: 'cyber_junkie',
      password: hashedPassword,
      role: Role.USER,
    },
  });

  const neonWanderer = await prisma.user.upsert({
    where: { email: 'neon_wanderer@viberoom.net' },
    update: {},
    create: {
      id: 'neon-wanderer-id',
      email: 'neon_wanderer@viberoom.net',
      username: 'neon_wanderer',
      password: hashedPassword,
      role: Role.USER,
    },
  });

  const adminPassword = await bcrypt.hash('AdminVibe2026!', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@viberoomer.com' },
    update: {
      username: 'admin',
      role: Role.ADMIN,
      password: adminPassword,
    },
    create: {
      email: 'admin@viberoomer.com',
      username: 'admin',
      password: adminPassword,
      role: Role.ADMIN,
    },
  });

  console.log('--- USERS CREATED / UPDATED ---');
  console.log(`Admin Email: ${admin.email}`);
  console.log(`Cyber Junkie: ${cyberJunkie.username}`);
  console.log(`Neon Wanderer: ${neonWanderer.username}`);
  console.log('-------------------------------');

  // 2. Seed Vibes
  const vibe1 = await prisma.vibe.upsert({
    where: { id: 'vibe-9482-a' },
    update: {},
    create: {
      id: 'vibe-9482-a',
      title: 'Cyber-Coffee & Heavy Code',
      content: 'System nominal. Caffeine levels critical. Compiling the latest core module while the rain hits the neo-glass.\nThe grid is quiet tonight. Good time for deep optimization.\n> Executing build sequence...',
      keywords: ['deepwork', 'lofi', 'coding', 'night', 'nestjs', 'junkpunk'],
      activity: ActivityContext.WORK,
      images: [
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
      musicUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      authorId: cyberJunkie.id,
      roomConfig: {
        themeColor: '#FFB000',
        bgImageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1600&q=80',
      },
    },
  });

  const vibe2 = await prisma.vibe.upsert({
    where: { id: 'vibe-9482-b' },
    update: {},
    create: {
      id: 'vibe-9482-b',
      title: 'Neon Highway Run',
      content: 'Sensors picking up heavy rain. Engine purring. Navigating the grid perimeter while the synthwave kicks in.\n> Establishing secure connection...',
      keywords: ['nightdrive', 'synthwave', 'cyberpunk', 'rain', 'drive', 'night-city'],
      activity: ActivityContext.NIGHT_DRIVE,
      images: [
        'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
      ],
      musicUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      authorId: cyberJunkie.id,
      roomConfig: {
        themeColor: '#BD00FF',
        bgImageUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1600&q=80',
      },
    },
  });

  const vibe3 = await prisma.vibe.upsert({
    where: { id: 'vibe-9482-c' },
    update: {},
    create: {
      id: 'vibe-9482-c',
      title: 'Rainy Alleyway Meditation',
      content: 'Midnight stroll through sector 7. Puddles reflecting holographic advertisements. Atmospheric audio calibrated for low-pulse walking.\n> Sensor readings steady...',
      keywords: ['outside', 'walk', 'ambient', 'rain'],
      activity: ActivityContext.WALK,
      images: [
        'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80',
      ],
      musicUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      authorId: neonWanderer.id,
      roomConfig: {
        themeColor: '#00F0FF',
        bgImageUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1600&q=80',
      },
    },
  });

  // 3. Seed Vibe Updates (delete existing first to avoid duplicate errors during re-seed)
  await prisma.vibeUpdate.deleteMany({
    where: { vibeId: { in: [vibe1.id, vibe2.id, vibe3.id] } },
  });

  await prisma.vibeUpdate.createMany({
    data: [
      {
        content: 'Core module compiled successfully. Deploying micro-services to main grid.',
        vibeId: vibe1.id,
      },
      {
        content: 'Initial transmission initiated. Atmospheric sensors online.',
        vibeId: vibe1.id,
      },
    ],
  });

  // 4. Seed Rooms
  const room1 = await prisma.room.upsert({
    where: { id: 'room-stream-01' },
    update: {},
    create: {
      id: 'room-stream-01',
      title: 'NEON MATRIX LIVE STREAM',
      description: 'High-bandwidth cyber stream featuring ambient synth loops, coding transmissions, and real-time visual drops.',
      originVibeId: vibe1.id,
      isPublic: true,
      tags: ['#stream', '#lofi', '#coding', '#deepwork'],
      images: [
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      ],
      videoUrl: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
      youtubeUrl: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
      musicUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      authorId: cyberJunkie.id,
      roomConfig: {
        themeColor: '#00F0FF',
        bgImageUrl: '',
      },
    },
  });

  // 5. Seed Room Streams, News, Notes
  await prisma.roomStreamItem.deleteMany({ where: { roomId: room1.id } });
  await prisma.roomStreamItem.createMany({
    data: [
      {
        type: 'youtube',
        title: 'Lofi Cyber Station Stream',
        url: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
        roomId: room1.id,
        authorId: cyberJunkie.id,
      },
      {
        type: 'image',
        content: 'Latest tactical terminal visual drop',
        mediaUrls: ['https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80'],
        roomId: room1.id,
        authorId: cyberJunkie.id,
      },
      {
        type: 'text',
        content: 'System parameters optimized. Synchronizing stream audio with grid frequency.',
        roomId: room1.id,
        authorId: cyberJunkie.id,
      },
    ],
  });

  await prisma.roomNews.deleteMany({ where: { roomId: room1.id } });
  await prisma.roomNews.create({
    data: {
      title: 'GRID MATRIX UPDATE 2.4 ONLINE',
      content: 'Atmospheric room feeds synced. High bandwidth stream audio loop is active for all grid operators.',
      roomId: room1.id,
      authorId: cyberJunkie.id,
    },
  });

  await prisma.roomNote.deleteMany({ where: { roomId: room1.id } });
  await prisma.roomNote.create({
    data: {
      title: 'System Operational Directives',
      content: `# Room Operational Blueprint\n\nWelcome to the **Neon Matrix Room**. Below are the attached note directives:\n\n- [x] Calibrate atmospheric frequencies\n- [x] Establish secure cyber stream endpoint\n- [ ] Deploy secondary backup node\n\n### Code Snippet\n\`\`\`ts\nconst streamStatus = "NOMINAL";\nconsole.log(\`[GRID]: \${streamStatus}\`);\n\`\`\`\n\n> Note: All operators must maintain high caffeine levels.`,
      roomId: room1.id,
      authorId: cyberJunkie.id,
    },
  });

  // 6. Seed Hashtags
  const hashtags = ['deepwork', 'lofi', 'coding', 'night', 'synthwave', 'drive', 'rain', 'night-city', 'outside', 'walk', 'ambient'];
  for (const tag of hashtags) {
    await prisma.hashtag.upsert({
      where: { name: tag },
      update: {},
      create: { name: tag, useCount: 1 },
    });
  }

  console.log('✅ Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
