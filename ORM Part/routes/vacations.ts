import express from 'express'
import {VacationService} from "../queries/vacations";

const router = express.Router();
const VacService = new VacationService();

export interface IVacation {
    id: string,
    employeeId: string,
    startDate: number,
    endDate: number,
    numberOfDays: number
}

router.get('/vacations', async (req, res) => {
    try {
        const vacations = await VacService.getVacations();
        res.json(vacations);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/vacations/:id', async (req, res) => {

    if (!req.params.id) {
        res.status(404).send('No vacation id');
        return;
    }

    try {
        const vacations = await VacService.getVacationById(req.params.id);
        if (vacations.length) {
            res.json(vacations[0]);
        } else {
            res.status(404).send('No vacation found');
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


router.post('/vacations', async (req, res) => {

    const newVacationData = req.body;

    if (!newVacationData.employeeId && !newVacationData.startDate && !newVacationData.numberOfDays) {
        res.status(400).send('Bad request');
        return;
    }

    try {
        const vacationId = await VacService.createVacation({
            employeeId: newVacationData.employeeId,
            startDate: newVacationData.startDate,
            numberOfDays: newVacationData.numberOfDays,
            endDate: newVacationData.startDate + (newVacationData.numberOfDays * 24 * 60 * 60 * 1000)
        });

        const vacations = await VacService.getVacationById(vacationId);
        res.json(vacations[0]);

    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/vacations/:id', async (req, res) => {

    if (!req.params.id) {
        res.status(404).send('No vacation id');
        return;
    }

    try {
        await VacService.deleteVacation(req.params.id);
        const vacations = await VacService.getVacations();
        res.json(vacations);

    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/vacations/:id', async (req, res) => {

    if (!req.params.id) {
        res.status(404).send('No vacation id');
        return;
    }

    const body = req.body;

    try {
        await VacService.updateVacation(req.params.id, body);
        const vacations = await VacService.getVacationById(req.params.id);
        res.json(vacations[0]);

    } catch (err) {
        res.status(500).json(err);
    }

});

router.get('/vacations-on-date', async (req, res) => {
    const searchDate = req.query.date;

    if (!searchDate) {
        res.status(404).send('No date provided');
        return;
    }

    try {
        res.json(await VacService.getVacationsOnDate(searchDate));
    } catch (e) {
        res.status(500).json(e)
    }

});

module.exports = router;
