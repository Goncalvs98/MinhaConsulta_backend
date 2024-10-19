const express = require('express');
const router = express.Router();
const consultationsController = require('../controllers/consultasController');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

// Rota para obter todas as consultas
router.get('/consultations', authenticateToken, (req, res) => {
    if (req.user.role === 'admin') {
      consultationsController.getConsultations(req, res); // Admin pode ver todas as consultas
    } else {
      consultationsController.getUserConsultations(req, res); // User pode ver apenas suas consultas
    }
  });

// Rota para criar uma nova consulta
router.post('/consultations', consultationsController.createConsultation);

module.exports = router;