import express from "express";
import IndexRouter from "./routes";
import NormalizeResponse from "./middleware/normalizeResponse";

const PORT = 3333;

try {
    const app = express();
    app.use(express.json());
    app.use(NormalizeResponse);
    
    app.use(IndexRouter);

    app.listen(PORT, () => console.log(`server running on port ${PORT}`));

} catch( error ) {
    console.error("a fatal error occurred", error);
}