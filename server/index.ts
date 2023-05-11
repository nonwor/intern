import { List } from "aws-sdk/lib/model";
import express, {Express, Request, Response} from "express";
import {getData, getList} from "./generic";

const port = 8080;
const app:Express = express();

app.get('/favicon.ico', (req:Request, res:Response) => res.status(204));

app.get("/", (req:Request, res:Response) => {
    res.send("hello from express!!!!!!!hello");
});

app.get("/:id", async(req:Request, res:Response) => {
    try{
        const content:string = await getData(req.params.id);
        const jsonObject:List= JSON.parse(content);

        /* We have nested list of JSON objects
        [
            [{},{}],
            [{},{}],
        ]
        */ 
       
        res.send(jsonObject);

    } catch (err) {
        console.log(err);
        res.status(500).send('Error getting object from S3 getObject()');
    }
   
});

app.get("/gen", (req:Request, res:Response) => {
    res.send("hello!");
});

// app.get("/genlist", async(req:Request, res:Response) => {
//     // res.send("hello");
//     try{
//         console.log("here 111");
//         const content = await getList();
//         console.log(content);
//         res.send("hello")
//     } catch (err){
//         console.log(err);
//         res.status(500).send('Error getting object from S3 ListObjectV2()');
//     }
// });

app.listen(port, () => {
    console.log(`now listening on port ${port}`)
})
