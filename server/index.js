const express = require('express');
const cors = require('cors');
const fileupload = require('express-fileupload');
const mycon = require('mysql');

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileupload());
app.use(express.urlencoded({extended:true}));

let c = mycon.createConnection({
    host : "localhost",
    port : 3306,
    user : "root",
    password : "Kiruthi@2505",
    database : "contact"
});

c.connect(function(error){
    if(error){console.log(error);}
    else{
        console.log('Database Connected');
    }
});

app.post('/Signup',(request,response)=>{

   let {role,firstname,lastname,email,mobile,location,descript,password} = request.body;
   
   let sql = 'insert into information(username,password,firstname,lastname,email,mobile,location,descript,role,status) values (?,?,?,?,?,?,?,?,?,?)';

   c.query(sql,[email,password,firstname,lastname,email,mobile,location,descript,role,0],(error,result)=>{
    if(error){
        let s = {"status":"error"}
        response.send(s);
    }
    else{
        let s = {"status":"success"};
        response.send(s);
    }
   })
})

app.post("/Signin",(request,response)=>{
    let {username,password} = request.body;

    let sql = 'select * from information where username=?';

    c.query(sql,[username],(error,result)=>{
        if(error){
            let s = {"status":"syntax_error"};
            response.send(s);
        }
        else if(result.length > 0){
            let username1 = result[0].username;
            let password1 = result[0].password;
            let role = result[0].role;
            let id = result[0].id;

            if(username1 === username && password1 === password){
                let s = {"status":"success","id":id,"role":role};
                response.send(s);
            }
            else{
                let s = {"status":"Invalid_details"};
                response.send(s);
            }
        }
        else{
            let s = {"status":"error"}
            response.send(s);
        }
    })
})

app.get('/dashboard',(request,response)=>{
    let sql='select * from information';
    c.query(sql,(error,result)=>{
        if(error){
            response.send(error);
        }
        else{
            response.send(result);
        }
    })
})
app.get('/userdashboard',(request,response)=>{
    var sql = 'SELECT * FROM information where role="User"';
    c.query(sql,(error,result)=>{
        if(error){
            response.send(error);
        }
        else{
            response.send(result);
        }
    })
})
app.get('/Employerdashboard',(request,response)=>{
    let sql='select * from information where role="Employer"';
    c.query(sql,(error,result)=>{
        if(error){
            response.send(error);
        }
        else{
            response.send(result);
        }
    })
})

app.post('/Delete',(request,response)=>{
    let id = request.body.id;
    let sql = 'delete from information where id=?';
    c.query(sql,[id],(error,result)=>{
        if(error){
            let s = {"status":"error"};
            response.send(s);
        }
        else{
            let s = {"status":"Success"};
            response.send(s);
        }
    })
})
app.get('/Update/:id',(request,response)=>{

    let {id} = request.params;

    let sql = 'select * from information where id=?';

    c.query(sql,[id],(error,result)=>{
        if(error){
            response.send(error);
        }
        else{
            response.send(result);
        }
    })

})

app.put('/updatedata/:id',(request,response)=>{
    let {id} = request.params;
    let {firstname,lastname,email,mobile,location,descript,password} = request.body;

    let sql = 'update information set firstname=?,lastname=?,email=?,mobile=?,location=?,descript=?,password=? where id=?';

    c.query(sql,[firstname,lastname,email,mobile,location,descript,password,id],(error,result)=>{
        if(error){
            let s = {"status":"error"};
            response.send(s);
        }
        else{
            let s = {"status":"Success"}
            response.send(s);
        }
    })

})


app.listen(3000 ,()=>{console.log('Server running on 3002')});