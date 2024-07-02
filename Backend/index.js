const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const axios = require('axios')
const cors = require('cors')
const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.options('*', cors()) 


var corsOptions = {
    origin: ['https://cp-analyzer.vercel.app/', 'http://localhost:5173/'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

const PORT = process.env.PORT || 9000;

app.get('/api/', cors(corsOptions), (req, res) => {
    res.send("Hello");
})

app.post('/api/submit', cors(corsOptions), async (req, res) => {
    const data = req.body;
    // console.log(data);
    
    const handle1 = data.email;
    const handle2 = data.password;
    const handle3 = data.leetcode;

    let data1 = null;
    let data2 = null;
    let data3 = null;
    let data11 = null;
    let data12 = null;

    // console.log(handle1)
    if(handle1 === "" && handle2 === "" && handle3 === "") {
        return res.status(401).json({message: "Any one field should be filled to submit"});
    }
    if(handle1 !== "") {

    
    try {

        const response = await axios.get(`https://codeforces.com/api/user.rating?handle=${handle1}`);
        const response1 = await axios.get(`https://codeforces.com/api/user.info?handles=${handle1}`);
        const response2 = await axios.get(`https://codeforces.com/api/user.status?handle=${handle1}&from=1&count=10000`);
        const resp = response.data;

        data1 = response.data;
        data11 =  response1.data;
        data12 = response2.data;
        
    
    }
    catch(error) {
        
        return res.status(404).json({message: `User with handle ${handle1} not found`});
    }

}
    if(handle2 !== "") {
    try {
        const chef = await axios.get(`https://codechef-api.vercel.app/${handle2}`);
        const res1 = chef.data;
        // console.log(res1);
        
        if(res1.success === true) {
            // res.status(200).json({message: "completed", to: '/', data: res1.currentRating});
            data2 = res1;
        }
        else {
            res.status(404).json({message: `User with handle ${handle2} not found`});
        }
    }
    catch(error) {
        
        return res.status(404).json({message: `User with handle ${handle2} not found`});
    }
}



if(handle3 !== "") {
    try {
        const leet = await axios.get(`https://leetcode-stats-api.herokuapp.com/${handle3}`);
        const res1 = leet.data;
        // console.log(res1);
        
        if(res1.status === "error") {
            return res.status(404).json({message: res1.message});
        }
        else {
            data3 = res1;
            
        }
        
    }
    catch(error) {
        
        return res.status(404).json({message: `User with handle ${handle2} not found`});
    }
}

res.status(200).json({data1: data1, data2: data2, data3: data3, data11: data11, data12: data12, to: '/'});

})



app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
})
module.exports = app;