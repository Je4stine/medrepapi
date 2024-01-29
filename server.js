const express = require('express');
const bodyParser = require('body-parser');4
const cors = require('cors');
const morgan = require('morgan');
const AuthCtl = require('./controllers/auth.controller');
const Availability = require('./controllers/availability.controller')
const Appointments = require('./controllers/appointments.controller')


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res)=>{
    res.send(
        '<h1> App running </h1>'
        )
});

app.post('/signup', AuthCtl.signup);
app.post('/signin', AuthCtl.signin);
app.post('/reset', AuthCtl.reset);

app.post('/availability', Availability.createAvailability)
app.post('/availabilityByuser', Availability.getVailabiltyByPk);
app.get('/allAvailabilities', Availability.getAll)

app.post('/createAppointment', Appointments.createAppointment)
app.post('/consappointments', Appointments.getAppointments)
app.post('/repappointments', Appointments.getRepAppointments)

app.listen(8000, ()=>{
    console.log('Server running at port 8000')
})


