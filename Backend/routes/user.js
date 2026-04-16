const router = express.router();
const pool = require('../db/pool');
const result = require('../utils/result')

router.post('/signup',(req,res)=>{

    //handle user sign up here
    const { username,password,role,address,mobileNo } = req.body;

    const userRole = (role=== 'customer') ? 'customer' : 'artist';

    const sql = `INSERT INTO users (username,password,role,address,mobile_no)' VALUES (?,?,?,?,?)`;

    pool.query(sql, [username,password,userRole,address,mobileNo], (error,data)=>{
        res.send(result.createResult(error,data));
    });

    res.send('User signed up successfully');

});