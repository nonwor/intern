
import dotenv from "dotenv";
import AWS from "aws-sdk";
import express, {Express, Request, Response} from "express";

const port = 8080;
const app:Express = express();


dotenv.config();

const accessKey = process.env.ACCESS_KEY;
const secretKey = process.env.SECRET_KEY;

AWS.config.update({
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
    region: 'us-east-1',
})

const s3 = new AWS.S3();

app.get("/", (req:Request, res:Response) => {
    res.send("Welcome to the Intern server");
});

app.get("/item/:id", async(req:Request, res:Response) => {
    try{
        const params ={
            Bucket: 'gk-heimdall-logs',
            Key: req.params.id,
        };
        
        const data = await s3.getObject(params).promise();

        if(data.Body){
            const jsonObject= JSON.parse(data.Body?.toString());
            res.send(jsonObject);
        } else {
            res.send("Error from AWS")
        }

        /* We have nested list of JSON objects
        [
            [{},{}],
            [{},{}],
        ]
        */ 

    } catch (err) {
        console.log(err);
        res.status(500).send('Error getting object from S3 getObject()');
    }
   
});

app.get("/gen", async(req:Request, res:Response) => {
    try{

        const params = {
            Bucket: "gk-heimdall-logs",
          };
        
        const data = await s3.listObjectsV2(params).promise();
        console.log(data.Contents?.toString());
        console.log(typeof({data}.data.Contents));
        console.log(typeof(data));
        
        res.status(200).send({data}.data.Contents);
        /* List of json object
        [{},{},{}]
        */

    } catch (err) {
        console.log(err);
        res.status(500).send('Error getting object from S3 getObject()');
    }
});

app.listen(port, () => {
    console.log(`now listening on port ${port}`)
})
