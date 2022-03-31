const express = require("express");
const mysql = require("mysql");

// const connection=require('./database')
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const cjson = require('compressed-json');
var s=4;

app.get('/', function (req, res) {
    res.send('Hey There!');
});
const connection = mysql.createConnection({
    host: 'localhost',
    database: 'assignment_management_system',
    user: 'root',
    password: 'root'
});

app.post('/login', (req, res) => {
    console.log(req.body)
    const username = (req.body.username);
    const password = (req.body.password);
    
    connection.query("SELECT * FROM student WHERE Email=? AND Password=?",
        [username, password],
        (err, result) => {
            if (err) res.send({ err: err });
            console.log(result)
            if (result.length!==0)
                res.send(result);
            else {
                connection.query("(SELECT * FROM teacher WHERE Email=? AND Password=?)",
                    [username, password],
                    (err, result1) => {
                        if (err) res.send({ err: err });
                        console.log(result1)
                        if (result1.length!==0)
                            res.send(result1);
                        else
                            res.send()
                    }
                )
            }
        }
    )
})

app.post('/student', (req, res) => {
    console.log(req.body)
    const Id = (req.body.Student_id);
    connection.query("SELECT * FROM student WHERE Student_id=?",
        [Id],
        (err, result) => {
            if (err) res.send({ err: err });
            else{
                console.log("f",result)
                res.send(result);
            }
        })
})

app.post('/assigned', (req, res) => {
    console.log(req.body)
    const Id = (req.body.Student_id);
    let date_ob = new Date();
    const curr=date_ob.getYear();
    console.log(curr)
    connection.query("SELECT *,DATE_FORMAT(a.Deadline,'%d-%m-%y') as deadline FROM assignment a,student s WHERE a.Class=s.Class AND s.Student_id=? AND a.Assignment_id NOT IN(SELECT Assignment_id from submission ) AND deadline>=? ORDER BY deadline ",
        [Id,curr],
        (err, result) => {
            if (err) res.send({ err: err });
            else{
                console.log("assignments",result)
                res.send(result);
            }
        })
})

app.post('/postanswer', (req, res) => {
    console.log(req.body)
    const Id = (req.body.Student_id);
    const Ass_id = (req.body.Ass_id);
    const answer=(req.body.Answer);
    if(answer!=null){
    s+=1;
    console.log(answer)
    connection.query("INSERT INTO submission values(?,?,?,?);",
    [s,Ass_id,Id,answer],
        (err, result) => {
            if (err) {console.log(err); res.send({ err: err });}
            else{
                console.log("assignments",result)
                res.send('200');
            }
        })
    }
})

app.post('/submitted', (req, res) => {
    console.log(req.body)
    const Id = (req.body.Student_id);
    connection.query("SELECT * FROM submission s,assignment a,student t where t.Student_id=? and s.Assignment_id=a.Assignment_id;",
        [Id],
        (err, result) => {
            if (err) res.send({ err: err });
            else{
                console.log("f",result)
                res.send(result);
            }
        })
})

app.post('/Teacher', (req, res) => {
    console.log(req.body)
    const Id = (req.body.Id);
    connection.query("SELECT * FROM teacher WHERE Id=?",
        [Id],
        (err, result) => {
            if (err) res.send({ err: err });
            else{
                console.log("f",result)
                res.send(result);
            }
        })
})

app.post('/assignments', (req, res) => {
    console.log(req.body)
    const Id = (req.body.Teacher_id);
    connection.query("SELECT *,DATE_FORMAT(a.Deadline,'%y-%m-%d') as deadline FROM assignment a,teacher t WHERE t.Subject_code=a.Subject_code AND t.Id=? ORDER BY deadline",
        [Id],
        (err, result) => {
            if (err) res.send({ err: err });
            else{
                console.log("assignments",result)
                res.send(result);
            }
        })
})

app.post('/marks', (req, res) => {
    console.log(req.body)
    const Id = (req.body.Submission_id);
    const Marks = (req.body.marks);
    
    connection.query("Insert into marks(Submission_id,marks) values(?,?); CREATE TRIGGER check_marks after insert on feedbackfor each row begin if new.marks>10 then rollback end if;",
        [Id,Marks],
        (err, result) => {
            if (err) res.send({ err: err });
            else{
                console.log("assignments",result)
                res.send(result);
            }
        })
})

app.post('/submittedteacher', (req, res) => {
    console.log(req.body)
    const Id = (req.body.Id);
    connection.query("SELECT * FROM submission s,assignment a,student t,feedback f WHERE t.Student_id=? AND a.Assignment_id=s.Assignment_id AND s.Student_id=t.Student_id",
        [Id],
        (err, result) => {
            if (err) res.send({ err: err });
            else{
                console.log("f",result)
                res.send(result);
            }
        })
})
 
app.post('/addassignment', (req, res) => {
    console.log(req.body)
    const Subject_code= (req.body.Subject_code);
    const Question=(req.body.Question);
    const Deadline= (req.body.Deadline);
    const Class= (req.body.Class);
    const Assignment_id= (req.body.Assignment_id);
    connection.query("Insert into assignment values(?,?,?,?,?);",
        [Assignment_id,Subject_code,Question,Deadline,Class],
        (err, result) => {
            if (err) res.send({ err: err });
            else{
                console.log("assignments",result)
                res.send(result);
            }
        })
})

app.listen(3001, function () {
    console.log('App Listening');
    connection.connect(function (err) {
        if (err) throw err;
        console.log('Database connected')
    })
});