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
const express_1 = __importDefault(require("express"));
const generic_1 = require("./generic");
const port = 8080;
const app = (0, express_1.default)();
app.get('/favicon.ico', (req, res) => res.status(204));
app.get("/", (req, res) => {
    res.send("hello from express!!!!!!!hello");
});
app.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const content = yield (0, generic_1.getData)(req.params.id);
        const jsonObject = JSON.parse(content);
        /* We have nested list of JSON objects
        [
            [{},{}],
            [{},{}],
        ]
        */
        res.send(jsonObject);
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Error getting object from S3 getObject()');
    }
}));
app.get("/gen", (req, res) => {
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
    console.log(`now listening on port ${port}`);
});
