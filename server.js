const express = require('express');
const bodyParser = require('body-parser');
const port = 3000

const bmiCalc = express();
bmiCalc.use(bodyParser.urlencoded( { extended:true } ));

bmiCalc.get('/bmiCalculator', (req, res) => {
    res.sendFile(__dirname + '/bmiCalculator.html');
});

bmiCalc.post('/bmiCalculator', (req, res) => {
    let weight = +req.body.weight;
    let height = +req.body.height;
    let result = weight / height**2;
    let bmi = Math.round(result * 10) / 10;
    let status = bmi < 18.4 ? 'Underweight' : bmi > 18.4 && bmi < 24.9 ? 'Healthy Weight' : bmi > 24.9 && bmi < 29.9 ? ' Overweight' : bmi > 29.9 ? 'Obese Weight' : 'Undefined'
    let responceContent = `<center><p><b>Your BMI</b>:  ${ bmi } <br><b>Status: </b> ${ status }</p> <br><a href='http://localhost:3000/bmiCalculator'> Do more Calculations </a> </center>` ;
    res.set('Content-Type', 'text/html');
    res.send(responceContent)
    
})

bmiCalc.get('/', (req, res) => {
    res.redirect('/bmiCalculator')
})

bmiCalc.listen(port, () => {
    console.log('Server is running successfullly at http://localhost:3000/bmiCalculator')
})