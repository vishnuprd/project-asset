const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const adminRoutes = require('./routes/admin.route.js');
const employeeRoutes = require('./routes/employee.route.js');
const laptopRoutes = require('./routes/laptop.route.js');
const desktopRoutes = require('./routes/desktop.route.js');
const scrapRoutes = require('./routes/scrap.route.js');
const DomainRoutes = require('./routes/domain.route.js');
const DongleRoutes = require('./routes/dongle.route.js');
const CCTVRoutes = require('./routes/cctv.route.js');
const PrinterRoutes = require('./routes/printer.route.js');
const ProjectorRoutes = require('./routes/projector.route.js');
const TabletRoutes = require('./routes/tablet.route.js');
const PhoneRoutes = require('./routes/phone.route.js');
const RouterRoutes = require('./routes/routers.route.js');
const SimRoutes = require('./routes/sim.route.js');



dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));


// Basic Route for testing
app.get('/', (req, res) => {
  res.send('Hello World');
});

// API Routes (use your route files if necessary)
// app.get('/api/admin/login', (req, res) => {
//   res.send('API is running...');
// });

const path = require('path');

// Serve static files from the React app
// if (process.env.NODE_ENV === 'production') {
//   //*Set static folder up in production
//   app.use(express.static('client/build'));

//   app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
// }


app.use('/api/admin', adminRoutes);
app.use('/api/employee', employeeRoutes);
app.use('/api/asset', laptopRoutes);
app.use('/api/asset', desktopRoutes);
app.use('/api/scrap', scrapRoutes);
app.use('/api/domain', DomainRoutes);
app.use('/api/asset',DongleRoutes);
app.use('/api/asset', CCTVRoutes);
app.use('/api/asset', PrinterRoutes);
app.use('/api/asset', ProjectorRoutes);
app.use('/api/asset', TabletRoutes);
app.use('/api/asset', PhoneRoutes);
app.use('/api/asset', RouterRoutes);
app.use('/api/asset',SimRoutes);


app.use((req, res, next) => {
  res.status(404).send('Route not found');
});

const connectionString = process.env.MONGODB_URL;

mongoose.connect(connectionString)
  .then(() => {
    console.log('Connected to MongoDB');
  
    const PORT = process.env.PORT || 4500;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    }).on('error', (err) => {
      console.log('Cannot start the server!', err);
      process.exit(1);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

module.exports = app;