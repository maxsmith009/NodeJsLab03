const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const employeeRouter = require('./routes/employees');
const vacationRouter = require('./routes/vacations');

const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const startDate = new Date();
const getUpTime = () => {
    return (new Date()).getTime() - startDate.getTime();
};

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', employeeRouter);
app.use('/', vacationRouter);

app.use('/health-check', (req: any, res: { json: (arg0: { startDate: Date; upTime: number; }) => void; }, next: any) => {
    res.json({
        startDate,
        upTime: getUpTime()
    });
});

// catch 404 and forward to error handler
app.use((req: any, res: any, next: (arg0: any) => void) => {
    next(createError(404));
});

// error handler
app.use((err: { message: any; status: any; }, req: { app: { get: (arg0: string) => string; }; }, res: { locals: { message: any; error: any; }; status: (arg0: any) => void; render: (arg0: string) => void; }, next: any) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
