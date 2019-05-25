import express from 'express'
import {EmployeeService} from "../queries/employees";
import {VacationService} from "../queries/vacations";

const router = express.Router();
const EmpService = new EmployeeService();
const VacService = new VacationService();

export interface IEmployee {
    id: string,
    firstName: string,
    lastName: string,
    vacationDaysLeft: number
}

router.get('/employees', async (req, res) => {
    try {
        const employees = await EmpService.getEmployees();
        res.json(employees);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/employees/:id', async (req, res) => {

    if (!req.params.id) {
        res.status(404).send('No employee id');
        return;
    }

    try {
        const employees = await EmpService.getEmployeeById(req.params.id);
        if (employees.length) {
            res.json(employees[0]);
        } else {
            res.status(404).send('No employee found');
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


router.post('/employees', async (req, res) => {

    const newEmployeeData = req.body;

    if (!newEmployeeData.firstName && !newEmployeeData.lastName) {
        res.status(400).send('Bad request');
        return;
    }

    try {
        const employeeId = await EmpService.createEmployee({
            firstName: newEmployeeData.lastName,
            lastName: newEmployeeData.lastName
        });

        const employees = await EmpService.getEmployeeById(employeeId);
        res.json(employees[0]);

    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/employees/:id', async (req, res) => {

    if (!req.params.id) {
        res.status(404).send('No employee id');
        return;
    }

    try {
        await EmpService.deleteEmployee(req.params.id);
        const employees = await EmpService.getEmployees();
        res.json(employees);

    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/employees/:id', async (req, res) => {

    if (!req.params.id) {
        res.status(404).send('No employee id');
        return;
    }

    const body = req.body;

    try {
        await EmpService.updateEmployee(req.params.id, body);
        const employees = await EmpService.getEmployeeById(req.params.id);
        res.json(employees[0]);

    } catch (err) {
        res.status(500).json(err);
    }

});

router.get('/employees/:id/vacations', async (req, res) => {

    if (!req.params.id) {
        res.status(404).send('No employee id');
        return;
    }

    try {
        res.json(await VacService.getVacationsOfEmployee(req.params.id));
    } catch (e) {
        res.status(500).json(e)
    }

});


router.post('/employees/:id/new-vacation-request', async (req, res) => {
    const employeeId = req.params.id;
    const body = req.body;

    if (!employeeId) {
        res.status(404).send('No employee id');
        return;
    }

    if (!body.startDate && !body.numberOfDays) {
        res.status(400).send('Bad request');
        return;
    }


    try {

        const employees = await EmpService.getEmployeeById(employeeId);

        if (employees.length) {
            const employeeCurrentData = employees[0];

            if (employeeCurrentData.vacationDaysLeft < body.numberOfDays) {
                res.status(404).send('Not enough days');
                return;
            }

            const vacationId = await VacService.createVacation({
                employeeId: employeeId,
                startDate: body.startDate,
                numberOfDays: body.numberOfDays,
                endDate: body.startDate + (body.numberOfDays * 24 * 60 * 60 * 1000)
            });

            await EmpService.updateEmployee(employeeId, {
                vacationDaysLeft: Number(employeeCurrentData.vacationDaysLeft) - Number(body.numberOfDays)
            });

            res.json(await VacService.getVacationById(vacationId));
        }
    } catch (e) {
        res.status(500).json(e)
    }

});

module.exports = router;
