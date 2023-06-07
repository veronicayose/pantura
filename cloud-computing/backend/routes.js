import express from 'express';

import {
    getAllReports,
    getDetailReport,
    updateReport,
    deleteReport,
    createReport,
    getAllReportsByUser,
    loginUser,
    createUser,
} from './handlers.js';

const router = express.Router();

// reports
router.get('/report/', getAllReports);
router.post('/report/', createReport);
router.get('/report/:id', getDetailReport);
router.put('/report/:id', updateReport);
router.delete('/report/:id', deleteReport);


//  users
// router.get('/users/', getAllUsers);
router.post('/user/', createUser);
router.get('/user/report/:id', getAllReportsByUser);
router.get('/login/', loginUser);

export default router;