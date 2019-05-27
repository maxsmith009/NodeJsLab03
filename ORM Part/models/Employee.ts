import {Table, Column, Model, DataType, PrimaryKey} from 'sequelize-typescript';

@Table({
    timestamps: false,
    tableName: "employees"
})
export class Employee extends Model<Employee> {
    @PrimaryKey
    @Column(DataType.STRING)
    public id: string;

    @Column(DataType.STRING)
    public  firstName: string;

    @Column(DataType.STRING)
    public lastName: string;

    @Column(DataType.INTEGER)
    public vacationDaysLeft: number;

/*    @HasMany(() => Hobby)
    lastName: Hobby[];*/
}
