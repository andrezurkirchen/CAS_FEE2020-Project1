/* Project 1 HSR CAS Frontend Engineering 2020
   André Zurkirchen
   June 2020
 */

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import {notesRoutes} from './routes/notesRoutes';

const app = express();
const router = express.Router();

app.use(express.static(path.resolve('public/html')));
app.use(express.static(path.resolve('public')));
app.use(bodyParser.json());

app.get("/", function(req, res){
    res.sendFile("/html/index.html",  {root: __dirname + '/public/'});
});

app.use("/notes", notesRoutes);

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('No token / Invalid token provided');
    }
    else
    {
        next(err);
    }
});

const hostname = '127.0.0.1';
const port = 3001;
app.listen(port, hostname, () => {
    console.log(`Note server running at http://${hostname}:${port}/`);
});