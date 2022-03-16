import express from 'express'
import route from './route'
import cors from 'cors'
import env from 'dotenv'
import http from 'http'

import install from './install/index'
import { getConfig, setStartData } from './data'

import socket from 'socket.io'
import socketProsess from './socket/index'
import { temporaryFileHandler } from './lib/timeChecker'


env.config()


const app = express();
const port =process.env.DEV_PORT || 4600

const server = http.createServer(app);
const corsOptions = {
  origin: [
    'http://www.lilith.co.kr',
    'http://www.lilith.co.kr:3120',
    'http://www.lilith.co.kr:3000',
    'http://www.lilith.co.kr:80',
    'http://lilith.co.kr',
    'http://localhost',
    'http://localhost:80',
    'http://localhost:3120',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:5001',
  ],
  credentials: true,   
  methods:["GET","POST"], 
};

const io = socket(server,{
  cors:corsOptions
})


app.use(cors(corsOptions));

app.use(express.json({limit: '500mb'})); 
app.use(express.urlencoded({limit: '500mb', extended: true}));
app.use(express.static('public'));
app.use('/api',route)
app.use('*', express.static(__dirname + 'public/index.html'));


console.clear()
install((res) => {
  if (res) {
    setStartData((status) => {
      if (!status) return;
      socketProsess(io);
      temporaryFileHandler()
      server.listen(port, () => {
        console.log(`url : ${process.env.DEV_PROTOCOL}://${process.env.DEV_DOMEIN}:${process.env.DEV_PORT}`
        );

     
      });
    });
  }
});




