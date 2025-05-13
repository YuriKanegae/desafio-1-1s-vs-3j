import express, { NextFunction, Request, Response, Router } from "express";

import addExecutionTimeToBody from "./utils/addExecutionTimeToBody";
import multer from "multer";
import IUserModel from "./models/IUserModel";
import UserRepository from "./repositories/userRepository";

const PORT   = 3333;

const app    = express();
const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.json());
app.use( (request: Request, response: Response, next: NextFunction ) => {
    response.locals.initTime = performance.now();
    response.locals.timeStamp = new Date().toISOString();

    next();
});

router.get("/", (request: Request, response: Response) => {
    const result = { message: `API is working on ${PORT}` };
    const normalizedResult = addExecutionTimeToBody(response, result);
    response.status(200).send(normalizedResult);
});

router.post("/users", upload.single("users"), (request: Request, response: Response) => {

    try {
        if(!request.file) {
            const normalizedResult = addExecutionTimeToBody(response, { message: "send user to users field" });
            response.status(400).send(normalizedResult);
            return;
        }

        const usersString = request.file?.buffer.toString();
        const usersJson: Array<IUserModel> = JSON.parse(usersString);

        const repository = new UserRepository();
        repository.setUsers(usersJson);
    
        const normalizedResult = addExecutionTimeToBody(response, { message: "Users created sucefully" });
        response.status(200).send(normalizedResult);

    } catch(error) {
        console.error(error);

        const normalizedResult = addExecutionTimeToBody(response, { message: "Internal server error" });
        response.status(500).send(normalizedResult);
    }
});

router.get("/superusers", (request: Request, response: Response) => {
    try {

        const repository = new UserRepository();
        const allUsers = repository.getAllUsers();
        const superUsers = allUsers.filter( user => user.score >= 900 && user.active );
    
        const normalizedResult = addExecutionTimeToBody(response, superUsers );
        response.status(200).send(normalizedResult);

    } catch(error) {
        console.error(error);

        const normalizedResult = addExecutionTimeToBody(response, { message: "Internal server error" });
        response.status(500).send(normalizedResult);
    }
});

router.get("/top-countries", (request: Request, response: Response) => {

    try {

        const repository = new UserRepository();
        const allUsers = repository.getAllUsers();

        const countryTotal: Record<string, number> = {};
        for( const user of  allUsers ) {
            if(!countryTotal[user.country])
                countryTotal[user.country] = 0;

            countryTotal[user.country]++;
        }

        const totalsArray: Array<{ country: string, total: number }> = [];
        for ( const country of Object.keys(countryTotal)) 
            totalsArray.push({ country: country, total: countryTotal[country]} );
        
        const sort = totalsArray.sort( (a, b) => a.total > b.total ? -1 : 1 );
        const top5 = sort.slice(0, 5);

        const normalizedResult = addExecutionTimeToBody(response, top5 );
        response.status(200).send(normalizedResult);

    } catch(error) {
        console.error(error);

        const normalizedResult = addExecutionTimeToBody(response, { message: "Internal server error" });
        response.status(500).send(normalizedResult);
    }
});


app.use(router);
app.listen(PORT, () => console.log(`server running on ${PORT}`) );