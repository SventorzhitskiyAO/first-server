const http = require('http');
const {parse} = require('querystring');
const hostname = '127.0.0.1';
const port = 3000;
const users = [
    {
        name: 'Alexandr'
    },
    {
        name: 'Daria'
    },
    {
        name: 'Aleksey'
    }
];

class Users {
    constructor(name) {
        this.name = name;
    }
}

const server = http.createServer((req, res) => {
    if (req.url === '/users') {
        switch (req.method) {
            case 'GET':
                getUsers(res);
                break;
            case 'POST':
                addNewUser(res, req);
                break;
            case 'PUT':
                changeUsers(res, req);
                break;
            default:
                res.statusCode = 404;
                res.end('Not found this page');
        }
    } else {
        res.statusCode = 404;
        res.end('Not found this page');
    }
})

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})

const getUsers = (res) => {
    res.statusCode = 200;
    res.setHeader('content-Type', 'text/plain');
    res.end(`${JSON.stringify(users)}`);
}

const addNewUser = (res, req) => {
    res.statusCode = 200;
    res.setHeader('content-Type', 'text/plain');
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        let params = parse(body);
        users.push(new Users(params.name))
        res.end(`${JSON.stringify(users)}`);
    });
}

const changeUsers = (res, req) => {
    deleteUsers();
    res.statusCode = 200;
    res.setHeader('content-Type', 'text/plain');
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        let params = parse(body);
        params.name.forEach(item => {
            users.push(new Users(item));
        })
        res.end(`${JSON.stringify(users)}`);
    });
}

const deleteUsers = () => {
    while (users.length !== 0) {
        users.pop();
    }
}