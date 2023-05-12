"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
dotenv_1.default.config();
const accessKey = process.env.ACCESS_KEY;
const secretKey = process.env.SECRET_KEY;
aws_sdk_1.default.config.update({
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
    region: 'us-east-1',
});
const s3 = new aws_sdk_1.default.S3();
function getData(inputTarget) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const params = {
                Bucket: 'gk-heimdall-logs',
                Key: inputTarget,
            };
            const data = yield s3.getObject(params).promise();
            if (data.Body) {
                return ((_a = data.Body) === null || _a === void 0 ? void 0 : _a.toString());
            }
            else {
                return ("Something wrong the the data.Body error");
            }
            ;
        }
        catch (e) {
            return ("500");
        }
        ;
    });
}
exports.getData = getData;
;
// export async function getList():Promise<string>{
//     try{
//         console.log("here")
//         // AWS.config.setPromisesDependency(Promise);
//         const params ={
//             Bucket: 'gk-heimdall-logs',
//             ListType: '4',
//         }
//         const data = await s3.listObjectsV2(params).promise();
//         console.log(data.Contents?.toString());
//         if(data.Contents){
//             return(data.Contents?.toString())
//         } else {
//             return("something is wrong with data.Contents")
//         }
//     }catch(e){
//         return "error";
//     }
// }
// async function handleGetRequest(req: Request, res: Response): Promise<void> {
//     const params = {
//       Bucket: "gk-heimdall-logs",
//     };
//     try {
//       const data = await s3.listObjectsV2(params).promise();
//       res.status(200).send(data);
//     } catch (err) {
//       console.log(err);
//       res.status(500).send("Error retrieving objects from S3");
//     }
//   }
// export {handleGetRequest};
