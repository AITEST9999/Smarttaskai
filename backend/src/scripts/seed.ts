import { PrismaClient, Priority, TaskStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { logger } from '../utils/logger';

const prisma = new PrismaClient();

async function main() {
  logger.info('Starting database seeding...');

  try {
    // Clean existing data in development
    if (process.env.NODE_ENV === 'development') {
      await prisma.chatMessage.deleteMany();
      await prisma.task.deleteMany();
      await prisma.user.deleteMany();
      logger.info('Cleaned existing data');
    }

    // Create demo users
    const hashedPassword = await bcrypt.hash('password123', 12);

    const demoUser = await prisma.user.create({
      data: {
        email: 'demo@smarttaskmanager.com',
        password: hashedPassword,
        firstName: 'Demo',
        lastName: 'User',
        emailVerified: new Date(),
        timezone: 'America/New_York',
        aiEnabled: true,
        aiNotifications: true,
        aiSuggestionLevel: 'high',
      },
    });

    const testUser = await prisma.user.create({
      data: {
        email: 'test@smarttaskmanager.com',
        password: hashedPassword,
        firstName: 'Test',
        lastName: 'User',
        emailVerified: new Date(),
        timezone: 'UTC',
        aiEnabled: true,
        aiNotifications: false,
        aiSuggestionLevel: 'medium',
      },
    });

    logger.info(`Created demo users: ${demoUser.email}, ${testUser.email}`);

    // Create sample tasks for demo user
    const tasks = await Promise.all([
      prisma.task.create({
        data: {
          title: 'Complete project proposal',
          description: 'Finish the Q1 project proposal document and send to stakeholders',
          priority: Priority.HIGH,
          status: TaskStatus.IN_PROGRESS,
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
          estimatedDuration: 120, // 2 hours
          tags: ['work', 'proposal', 'q1'],
          userId: demoUser.id,
          aiGenerated: false,
          aiPriority: 0.85,
        },
      }),
      prisma.task.create({
        data: {
          title: 'Review team performance reports',
          description: 'Go through all team member performance reports for the quarterly review',
          priority: Priority.MEDIUM,
          status: TaskStatus.TODO,
          dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
          estimatedDuration: 90, // 1.5 hours
          tags: ['work', 'hr', 'review'],
          userId: demoUser.id,
          aiGenerated: false,
          aiPriority: 0.65,
        },
      }),
      prisma.task.create({
        data: {
          title: 'Schedule dentist appointment',
          description: 'Book a routine dental checkup appointment for next month',
          priority: Priority.LOW,
          status: TaskStatus.TODO,
          estimatedDuration: 15,
          tags: ['personal', 'health'],
          userId: demoUser.id,
          aiGenerated: true,
          aiPriority: 0.3,
        },
      }),
      prisma.task.create({
        data: {
          title: 'Plan weekend trip',
          description: 'Research and plan a weekend getaway with the family',
          priority: Priority.LOW,
          status: TaskStatus.TODO,
          estimatedDuration: 60,
          tags: ['personal', 'travel', 'family'],
          userId: demoUser.id,
          aiGenerated: false,
          aiPriority: 0.2,
        },
      }),
      prisma.task.create({
        data: {
          title: 'Update LinkedIn profile',
          description: 'Update professional summary and add recent work experiences',
          priority: Priority.MEDIUM,
          status: TaskStatus.COMPLETED,
          completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
          estimatedDuration: 45,
          tags: ['career', 'networking'],
          userId: demoUser.id,
          aiGenerated: false,
          aiPriority: 0.55,
        },
      }),
    ]);

    logger.info(`Created ${tasks.length} sample tasks`);

    // Create a parent task with subtasks
    const parentTask = await prisma.task.create({
      data: {
        title: 'Organize home office',
        description: 'Complete reorganization of the home office space',
        priority: Priority.MEDIUM,
        status: TaskStatus.IN_PROGRESS,
        estimatedDuration: 240, // 4 hours total
        tags: ['personal', 'organization', 'home'],
        userId: demoUser.id,
        aiGenerated: false,
        aiPriority: 0.6,
      },
    });

    const subtasks = await Promise.all([
      prisma.task.create({
        data: {
          title: 'Sort through old documents',
          description: 'Go through filing cabinet and organize documents',
          priority: Priority.MEDIUM,
          status: TaskStatus.COMPLETED,
          completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
          estimatedDuration: 60,
          tags: ['organization', 'documents'],
          userId: demoUser.id,
          parentTaskId: parentTask.id,
          aiGenerated: false,
        },
      }),
      prisma.task.create({
        data: {
          title: 'Clean and organize desk',
          description: 'Clear desk surface and organize supplies',
          priority: Priority.MEDIUM,
          status: TaskStatus.IN_PROGRESS,
          estimatedDuration: 45,
          tags: ['organization', 'cleaning'],
          userId: demoUser.id,
          parentTaskId: parentTask.id,
          aiGenerated: false,
        },
      }),
      prisma.task.create({
        data: {
          title: 'Set up new storage system',
          description: 'Install shelves and organize storage containers',
          priority: Priority.MEDIUM,
          status: TaskStatus.TODO,
          estimatedDuration: 120,
          tags: ['organization', 'diy'],
          userId: demoUser.id,
          parentTaskId: parentTask.id,
          aiGenerated: false,
        },
      }),
    ]);

    logger.info(`Created parent task with ${subtasks.length} subtasks`);

    // Create sample chat messages
    const chatMessages = await Promise.all([
      prisma.chatMessage.create({
        data: {
          message: 'Help me organize my tasks for today',
          response: 'I can help you organize your tasks! Based on your current tasks, I recommend focusing on "Complete project proposal" first since it has a high priority and upcoming deadline. Would you like me to suggest a schedule?',
          role: 'USER',
          userId: demoUser.id,
          taskIds: [tasks[0].id],
          context: JSON.stringify({ intent: 'task_organization', priority: 'high' }),
        },
      }),
      prisma.chatMessage.create({
        data: {
          message: 'Yes, please create a schedule for my high priority tasks',
          response: 'Here\'s a suggested schedule for your high priority tasks:\n\n1. Complete project proposal (2 hours) - Due in 7 days\n2. Review team performance reports (1.5 hours) - Due in 3 days\n\nI recommend tackling the project proposal first since it requires more focused time. Would you like me to break it down into smaller subtasks?',
          role: 'ASSISTANT',
          userId: demoUser.id,
          taskIds: [tasks[0].id, tasks[1].id],
          context: JSON.stringify({ intent: 'scheduling', suggested_order: [tasks[0].id, tasks[1].id] }),
        },
      }),
    ]);

    logger.info(`Created ${chatMessages.length} sample chat messages`);

    // Create some tasks for test user
    await prisma.task.create({
      data: {
        title: 'Test task',
        description: 'This is a test task for automated testing',
        priority: Priority.LOW,
        status: TaskStatus.TODO,
        tags: ['test'],
        userId: testUser.id,
        aiGenerated: false,
      },
    });

    logger.info('Database seeding completed successfully!');

    // Log summary
    const userCount = await prisma.user.count();
    const taskCount = await prisma.task.count();
    const chatCount = await prisma.chatMessage.count();

    logger.info(`Summary: ${userCount} users, ${taskCount} tasks, ${chatCount} chat messages`);

  } catch (error) {
    logger.error('Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error) => {
  logger.error('Seeding failed:', error);
  process.exit(1);
}); 