const httpServer = require('http');
const url = require('url');
const fs = require('fs');

const replaceTemplate = require('./modules/replaceTemplate');


/// Read data from file
// Template
const tempCourse = fs.readFileSync(
    `${__dirname}/data/loanData.json`,
    'utf-8'
);

/////////////////////////////////
// Template
const templateHTMLCourse = fs.readFileSync(
    `${__dirname}/template/templateCourse.html`,
    'utf-8'
);


const dataObj = JSON.parse(tempCourse);// string to JavaScript Object JSON
// console.log(dataObj);

// console.log("+++++" + tempCourse)

dataObj.forEach(function (item) {

    item.loanAmount = function (val = 2) {
        return item.interest * val;
    }
})


////////////////////////////////
//Create Server
// const server = httpServer.createServer(function (req, res) {// call back function
const server = httpServer.createServer((req, res) => {// call back function

    // const urlParameter = url.parse(req.url, true);
    // console.log(JSON.stringify(urlParameter.query));// convert to String
    // console.log(JSON.stringify(urlParameter.pathname));// convert to String
    const { query, pathname } = url.parse(req.url, true); // object distructors
    if (query.id) {// if there is query parameter named id read as string
        // Courses page
        if (pathname === '/' || pathname.toLowerCase() === '/courses') {
            res.writeHead(200, {// Every thing ran successfully
                'Content-type': 'text/html'
            });

            const course = dataObj[Number(query.id)];// convert string to numeric value
            // const strCourseName = JSON.stringify(course);
            // LoanAmt(query.id);
            const totalamnt = function (course) {

                var Pmt = 250;
                var monthInterest = course.interest / 1200;
                // var monthInterest = 0.5;

                var Numbermonth = course.loanTermYears * 12;
                //var Numbermonth = 48 ;

                var sample = (1 + monthInterest);
                var target = 1 - (1 / (Math.pow(sample, Numbermonth)));

                var LoanAmount = (Pmt / monthInterest) * (target)
                return LoanAmount;
            }
            const Final = totalamnt(course)
            console.log(Final)

            let courseHTML = replaceTemplate(templateHTMLCourse, course);// function that will replace the course values in the HTML
            courseHTML = courseHTML.replace(/{%LOANAMOUNT%}/g, Final);

            res.end(courseHTML);
        }
    }
    else {
        res.writeHead(404, {// Server did not find what you were looking for
            'Content-type': 'text/html'
        });
        res.end(`resource not found`)
    }
});

//Start Listening to requests
server.listen(8000, 'localhost', () => {
    console.log('Listening to requests on port 8000');
});

