// https://www.youtube.com/watch?v=EN6Dx22cPRI , on 14:11 
// source 1: https://medium.com/featurepreneur/a-guide-to-dockerize-your-node-js-application-c24b5e129995

const express = require('express');
const mysql = require('mysql')
const redis = require('redis')

// Create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'sudouser',
});

db.connect((err) => {
    if(err){
       throw err;
    }
    console.log('MySql Connected...');
});

const app = express();

// Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result) => {
       if(err) throw err;
       console.log(result);
       res.send('Database created...');
    });
});

// Create table
app.get('/createposttable', (req, res) => {
    let sql = 'CREATE TABLE posts (id int AUTO_INCREMENT, name  VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
	if(err) throw err;
	console.log(result);
	res.send('Posts table created...');
    });
});


// Insert post 1
app.get('/addpost1', (req, res) => {
    let post = {title:'post one', body:'this is post number one'};
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, result) => {
	if(err) throw err;
        console.log(result);
        res.send('Posts 1 added...');
    });
});

app.listen('5000', () => {
    console.log('Server started on port 5000');
});
