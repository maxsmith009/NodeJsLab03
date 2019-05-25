import {DB_URL} from '../../constants';
import {IVacation} from "../../routes/vacations";

const uniqid = require('uniqid');
const pgp = require('pg-promise')();
const db = pgp(DB_URL);

export interface IVacationService {
    getVacations(): Promise<IVacation[]>;

    getVacationById(id: string): Promise<IVacation[]>;

    createVacation({employeeId, startDate, numberOfDays, endDate}: { employeeId: string, startDate: number, numberOfDays: number, endDate: number }): Promise<string>;

    deleteVacation(id: string): Promise<IVacation[]>;

    updateVacation(id: string, {employeeId, startDate, numberOfDays, endDate}: { employeeId: string, startDate: number, numberOfDays: number, endDate: number }): Promise<IVacation[]>;

    getVacationsOfEmployee(employeeId: string): Promise<IVacation[]>;

    getVacationsOnDate(date: number): Promise<IVacation[]>;
}

export class VacationService implements IVacationService {

    constructor() {
    }

    public async getVacations() {
        return await db.any('SELECT * FROM vacations');
    };

    public async getVacationById(id: string) {
        return await db.any('SELECT * FROM vacations WHERE id = $1', [id]);
    };

    public async createVacation({employeeId, startDate, numberOfDays, endDate}: { employeeId: string, startDate: number, numberOfDays: number, endDate: number }) {
        const id = uniqid();
        await db.any('INSERT INTO vacations(id, "employeeId", "startDate", "numberOfDays", "endDate") VALUES ($1, $2, $3, $4, $5)', [id, employeeId, startDate, numberOfDays, endDate]);
        return id;
    };

    public async deleteVacation(id: string) {
        return await db.any('DELETE FROM vacations WHERE id = $1 ', [id]);
    };

    public async updateVacation(id: string, {employeeId, startDate, numberOfDays, endDate}: { employeeId?: string, startDate?: number, numberOfDays?: number, endDate?: number }) {
        let queryArray = [];
        if (employeeId) {
            queryArray.push(`"employeeId"='${employeeId}'`);
        }

        if (startDate) {
            queryArray.push(`"startDate"='${startDate}'`);
        }

        if (numberOfDays) {
            queryArray.push(`"numberOfDays"=${numberOfDays}`);
        }

        if (endDate) {
            queryArray.push(`"endDate"=${endDate}`);
        }

        if (!queryArray.length) {
            return;
        }
        const query = `UPDATE vacations SET ${queryArray.join(',')} WHERE id='${id}'`;
        return await db.any(query, []);
    };

    public async getVacationsOfEmployee(employeeId: string) {
        return await db.any('SELECT * FROM vacations WHERE "employeeId"=$1', [employeeId]);
    };

    public async getVacationsOnDate(date: number) {
        return await db.any('SELECT * FROM vacations WHERE "startDate"<=$1 AND "endDate">=$1', [date]);
    };
}






