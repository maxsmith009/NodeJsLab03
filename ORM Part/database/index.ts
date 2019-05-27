import {credentialsLocatHost} from "../constants";
import {Sequelize} from 'sequelize-typescript';
import {Employee} from "../models/Employee";

const sequelize = new Sequelize({
    database: credentialsLocatHost.database,
    dialect: 'postgres',
    username: credentialsLocatHost.user,
    password: credentialsLocatHost.password,
    modelPaths: ['../models']
});

sequelize.addModels([Employee]);

module.exports = sequelize;
