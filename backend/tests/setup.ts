import { PrismaClient } from '@prisma/client';

// Mock environment variables for testing
process.env.NODE_ENV = 'test';
process.env.DATABASE_URL = 'postgresql://postgres:postgres@localhost:5432/smart_task_manager_test';
process.env.JWT_SECRET = 'test-jwt-secret';
process.env.LOG_LEVEL = 'error'; // Reduce log noise during tests

// Global test database instance
declare global {
  var __testPrisma: PrismaClient | undefined;
}

// Create test database client
const testPrisma = globalThis.__testPrisma || new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

if (process.env.NODE_ENV === 'test') {
  globalThis.__testPrisma = testPrisma;
}

// Global test setup
beforeAll(async () => {
  // Connect to test database
  await testPrisma.$connect();
});

// Clean up database before each test
beforeEach(async () => {
  // Clean all tables in the correct order (respecting foreign key constraints)
  await testPrisma.chatMessage.deleteMany();
  await testPrisma.task.deleteMany();
  await testPrisma.user.deleteMany();
});

// Global test teardown
afterAll(async () => {
  // Clean up and disconnect
  await testPrisma.chatMessage.deleteMany();
  await testPrisma.task.deleteMany();
  await testPrisma.user.deleteMany();
  await testPrisma.$disconnect();
});

export { testPrisma }; 