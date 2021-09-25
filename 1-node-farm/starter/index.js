const fs = require('fs');
const http = require('http')
const url = require('url');

const replaceTemplate = require('./module/replaceTemplate')

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
const dataObj = JSON.parse(data);
    
const server = http.createServer((req, res) => {
    const pathName = req.url;
    const { query, pathname} = url.parse(req.url, true);

    if(pathname === '/' || pathname === '/overview'){
        res.writeHead(200, {'Content-type':'text/html'});
        
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        // console.log(cardsHtml);

        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);
    }
    
    
    else if(pathname === '/product'){
        // console.log(query);
        res.writeHead(200, { 'Content-type':'text/html'})
        const product = dataObj[query.id]
        const output = replaceTemplate(tempProduct, product);
        res.end(output);
    } 
    
    
    else if(pathName === '/api'){
        res.writeHead(200, {
            'Content-type': 'application/json'
        });
        res.end(prouctData);
    }
    
    
    else{
        res.writeHead(404, {
            'Content-type':  'text/html',
            'my-own-header': 'hello world' 
        });
        res.end('<h1>page not found</h1>');
    }
})

server.listen(8000, '127.0.0.1', () => {
    console.log("server started on port no 8000");
})


// synchronous ( blocking )

// const textIn = fs.readFileSync('./output.txt','utf-8');
// console.log(textIn);
// // const textOut = `this is it : ${textIn} . \n  create on on ${Date.now()}`
// const textOut = `\n\n\nUpdate existing file`
// fs.writeFileSync('output.txt', textOut);

// asynchrounous (non blocking)
// fs.readFile('./txt/start.txt', 'utf-8', (err, data) => { 
//     console.log("hi");
// })
 



//        


// call back hell
// fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
//     fs.readFile(`./txt/${data}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//             console.log(data3);
//             fs.writeFile('./txt/final.txt',`${data2}\n${data3}` , 'utf-8', err =>{
//                 console.log('your file written');
//             })
//         });
//     }); 
// });
// console.log('will read file');