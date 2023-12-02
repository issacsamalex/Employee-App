// Task1: initiate app and run server at 3000
const express = require('express');
const app = new express();
const cors = require('cors');
const mongoose = require('mongoose');

const PORT = 3000;

// middlewares
app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));

// Task2: create mongoDB connection 
mongoose.connect('mongodb+srv://issacsamalex:UbvLYJ7s1HZ5MgRi@cluster0.fgcudtx.mongodb.net/employeeDB?retryWrites=true&w=majority')
.then(() => {
    console.log('Connected to MongoDB Atlas');
})
.catch(err => {
    console.log(err);
})
// Define Employee Schema
const employeeSchema = new mongoose.Schema({
    name: String,
    position: String,
    location: String,
    salary: String
    
})
const employee = mongoose.model('employeeList', employeeSchema);


//Task 2 : write api with error handling and appropriate api mentioned in the TODO below






//TODO: get data from db  using api '/api/employeelist'
app.get('/api/employeelist', async (req, res) => {
    try {
        if(employee){
            const allEmployee = await employee.find();
            res.json(allEmployee);
        }
        
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});



//TODO: get single data from db  using api '/api/employeelist/:id'
app.get('/api/employeelist/:id', async(req, res) => {
    try {
        if(employee){
            const oneEmployee = await employee.findById(req.params.id);
            res.json(oneEmployee);
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});




//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.post('/api/employeelist', async(req, res) => {
    const {name, position, location, salary} = req.body;
    const employeeList = new employee({
        name,
        position,
        location,
        salary
    });

    try {
        const newEmployee = await employeeList.save();
        res.json(newEmployee);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});





//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete('/api/employeelist/:id', async(req, res) => {
    try {
        const deletedEmployee = await employee.findByIdAndDelete(req.params.id);
        res.json(deletedEmployee);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});




//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put('/api/employeelist', async(req, res) => {
    const {name, position, location, salary} = req.body;
    const {_id} = req.body;
    try {
        const updatedEmployee = await employee.findByIdAndUpdate(
            _id,
            {name, position, location, salary},
            {new: true}
        );
        res.json(updatedEmployee);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});



