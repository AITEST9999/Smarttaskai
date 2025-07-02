import { Router } from 'express';

const router = Router();

// API welcome message
router.get('/', (_req, res) => {
  res.json({
    message: 'Welcome to Smart Task Manager API',
    version: '1.0.0',
    documentation: '/api/docs',
    health: '/api/health',
  });
});

// Import and use route modules (will be added as we build them)
// router.use('/auth', authRoutes);
// router.use('/tasks', taskRoutes);
// router.use('/ai', aiRoutes);
// router.use('/users', userRoutes);

export default router; 