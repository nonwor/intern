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
const dotenv_1 = __importDefault(require("dotenv"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const port = 8080;
const app = (0, express_1.default)();
const corsOption = {
    origin: "http://localhost:4200"
};
app.use((0, cors_1.default)(corsOption));
dotenv_1.default.config();
const accessKey = process.env.ACCESS_KEY;
const secretKey = process.env.SECRET_KEY;
aws_sdk_1.default.config.update({
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
    region: 'us-east-1',
});
const s3 = new aws_sdk_1.default.S3();
//Home route
app.get("/", (req, res) => {
    const data = { message: "hello for server!" };
    res.json(data);
});
//Get specific data from "Key"
app.get("/item/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const params = {
            Bucket: 'gk-heimdall-logs',
            Key: req.params.id,
        };
        const data = yield s3.getObject(params).promise();
        if (data.Body) {
            const jsonObject = JSON.parse((_a = data.Body) === null || _a === void 0 ? void 0 : _a.toString());
            res.send(jsonObject);
        }
        else {
            res.send("Error parsing data body");
        }
        ;
        /* We have NESTED list of JSON objects
        [
            [{},{}],
            [{},{}],
        ]
        */
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Error getting object from S3 getObject()');
    }
    ;
}));
//Call the generic URL to get the "KEY"s
app.get("/gen", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = {
            Bucket: "gk-heimdall-logs",
        };
        const data = yield s3.listObjectsV2(params).promise();
        res.status(200).send({ data }.data.Contents);
        /* List of json object
        [{},{},{}]
        */
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Error getting object from S3 getListObjectV2()');
    }
}));
app.listen(port, () => {
    console.log(`now listening on port ${port}`);
});
