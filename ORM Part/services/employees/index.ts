import {IEmployee} from "../../routes/employees";
import {credentialsLocatHost} from "../../constants";
import * as sequelize from '../../database'

const uniqid = require('uniqid');
const pgp = require('pg-promise')();
const db = pgp(credentialsLocatHost);


export interface IEmployeeService {
    getEmployees(): Promise<IEmployee[]>;

    getEmployeeById(id: string): Promise<IEmployee[]>

    createEmployee({firstName, lastName}: { firstName: string, lastName: string }): Promise<string>

    deleteEmployee(id: string): Promise<IEmployee[]>

    updateEmployee(id: string, {firstName, lastName, vacationDaysLeft}: { firstName?: string, lastName?: string, vacationDaysLeft?: number }): Promise<IEmployee[]>
}


export class EmployeeService implements IEmployeeService {

    constructor() {
    }

    public async getEmployees() {



        const awaw = await sequelize.models.Employee.findAll();
        console.log(awaw);
        //return await db.any('SELECT * FROM employees');
    };

    public async getEmployeeById(id: string) {
        return await db.any('SELECT * FROM employees WHERE id = $1', [id]);
    };

    public async createEmployee({firstName, lastName}: { firstName: string, lastName: string }) {
        const id = uniqid();
        await db.any('INSERT INTO employees(id, "firstName", "lastName", "vacationDaysLeft") VALUES ($1, $2, $3, $4)', [id, firstName, lastName, 27]);
        return id;
    };

    public async deleteEmployee(id: string) {
        return await db.any('DELETE FROM employees WHERE id = $1 ', [id]);
    };

    public async updateEmployee(id: string, {firstName, lastName, vacationDaysLeft}: { firstName?: string, lastName?: string, vacationDaysLeft?: number }) {
        let queryArray = [];
        if (firstName) {
            queryArray.push(`"firstName"='${firstName}'`);
        }

        if (lastName) {
            queryArray.push(`"lastName"='${lastName}'`);
        }

        if (vacationDaysLeft) {
            queryArray.push(`"vacationDaysLeft"=${vacationDaysLeft}`);
        }

        if (!queryArray.length) {
            return;
        }
        const query = `UPDATE employees SET ${queryArray.join(',')} WHERE id='${id}'`;
        return await db.any(query, []);
    };

}

