import dotenv from "dotenv";
import AWS, { DataSync } from "aws-sdk";

dotenv.config();

const accessKey = process.env.ACCESS_KEY;
const secretKey = process.env.SECRET_KEY;

AWS.config.update({
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
    region: 'us-east-1',
})

const s3 = new AWS.S3();

// export function getData(inputTarget:string): string{

//     const params ={
//         Bucket: 'gk-heimdall-logs',
//         Key: inputTarget,
//     };

//     s3.getObject(params, (err, data) => {
//         if(err){
//             console.error(err);
//             return('Error generating pre-signed URL 500')
//         } else {
//             console.log(data.Body?.toString());
//             return(data.Body?.toString())
//         }
//     })

//     return "working on ";
// }

export async function getData(inputTarget:string):Promise<string>{
    
    try{
        const params ={
            Bucket: 'gk-heimdall-logs',
            Key: inputTarget,
        };
        
        const data = await s3.getObject(params).promise();
       
        if (data.Body){
            return(data.Body?.toString());
        } else{
            return ("Something wrong the the data.Body error");
        }
        
    }catch(e){
        return("500");
    }
    
}

export async function getList():Promise<string>{

    try{
        console.log("here")
        // AWS.config.setPromisesDependency(Promise);
        const params ={
            Bucket: 'gk-heimdall-logs',
            ListType: '4',
        }
        const data = await s3.listObjectsV2(params).promise();

        console.log(data.Contents?.toString());
        if(data.Contents){
            return(data.Contents?.toString())
        } else {
            return("something is wrong with data.Contents")
        }

    }catch(e){
        return "error";
    }
}