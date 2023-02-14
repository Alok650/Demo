const express = require('express');
const cors = require('cors')

// Express Initialize
const app = express();
const fetch = (...args) =>
    import ('node-fetch').then(({ default: fetch }) => fetch(...args));
const port = 8000;
app.use(express.json());

/* CORS configuration */
app.use(cors({
    origin: "*",
}));

//create api
app.get("/", async(req, res) => {
    const clientip = req.ip;
    const timestamp = new Date();
    const response = await fetch('http://169.254.169.254/latest/meta-data/instance-id');
    const instanceid = await response.text();
    console.log("Sent hello-world to " + clientip + " at " + timestamp + " from " + instanceid)
    res.json({
        instance_id: instanceid,
        message: "hello world from " + instanceid + " to client " + clientip,
    });
});

app.listen(port, () => {
    console.log('listen port 8000');
})