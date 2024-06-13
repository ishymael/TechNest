//----------------------------THIS PAGE IS NOT USED------------------------------------------------------------------------

// const http = require('http');
// const fs = require('fs');


// //request 
// const server = http.createServer((req, res) => {

//     console.log(req.url, req.method);

//     res.setHeader('Content-type', 'text/html');

//     let path = './';

//     switch(req.url){
        
//         case '/index':
//         path+= 'index.html';
//         break;

//         case '/about-us':
//             path+= 'AboutUs.html';
//             break;

//         case '/employees':
//             path+= 'Employees.html';
//             break;  
            
//         case '/addemp':
//             path+= 'addemployee.html';
//             break;

//         case '/contact':
//             path+= 'Contact.html';
//             break;

//         default:
//             path+= 'error.html';
//             break;

        

//     }

//     fs.readFile(path, (err, data) =>{
//         if(err){
//             console.log(err);
//             res.end();
//         }else{
//             res.end(data);
//         }
//     })


// })


// server.listen(3000, 'localhost', () => {
//     console.log('Listening for requests on port 3000.')
// }) 

