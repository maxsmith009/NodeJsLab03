const Sequelize = require('sequelize');
const sequelize = require('../database/index');

const Model = Sequelize.Model;

class Vacation extends Model {}
Vacation.init( {
    id:{
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey:true
    },
    employeeId:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    startDate:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    endDate:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    numberOfDays:{
        type: Sequelize.INTEGER,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'vacations',
    timestamps: false
});

module.exports = Vacation;
