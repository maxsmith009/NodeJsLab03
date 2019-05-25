# NodeJsLab02

Applications to make http calls and seva result in json files

### Installing

Step 1. Clone the repo
```
git clone https://github.com/maxsmith009/NodeJsLab03.git
```

To access SQL application use 
```
cd SQL Part
```

To access ORM application use 
```
cd ORM Part
```

Step 2. Install dependencies
```
npm install
```

Step 3. Run server
```
npm start
```

##Interfaces

Employee Interface

```
interface IEmployee {
    id: string,
    firstName: string,
    lastName: string,
    vacationDaysLeft: number
}
```

Vacation Interface

```
interface IVacation {
    id: string,
    employeeId: string,
    startDate: number,
    endDate: number,
    numberOfDays: number
}
```


## ExpressPart Api

Get all employees
```
GET /employees
```
Get employee by id
```
GET /employees/:id
```
Create employee
```
POST /employees
```
{
    "firstName": "string",
    "lastName": "string"
}

Delete employee by id
```
DELETE /employees/:id
```
Update employee by id
```
PUT /employees/:id
```
{
    "firstName": "string",
    "lastName": "string",
    "vacationDaysLeft": number
}






Get all vacations
```
GET /vacations
```
Get vacation by id
```
GET /vacations/:id
```
Create vacation
```
POST /vacations
```
{
    "employeeId":"string"
    "startDate": number (time in milliseconds)
    "numberOfDays": number
}

Delete vacation by id
```
DELETE /vacations/:id
```
Update vacation by id
```
PUT /vacations/:id
```
{
    "employeeId":"string"
    "startDate": number (time in milliseconds)
    "numberOfDays": number,
     "endDate": number (time in milliseconds)
}







Create new vacation
```
POST /employees/:id/new-vacation-request
```
{
    "startDate": number (time in milliseconds)
    "numberOfDays": number
}


Get vacations of employee
```
GET /employees/:id/vacations
```
Get employees, who are on vacation in specific day
```
GET /vacations-on-date?date=<time in milisecinds>
```
Get server status
```
GET /health-check
```
