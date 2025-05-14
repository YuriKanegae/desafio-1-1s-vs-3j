import { Router } from "express";
import multer from "multer";
import ApiInfoController from "../modules/info/apiInfoController";
import CreateUsersController from "../modules/user/controllers/createUsersController";
import GetSuperUsersController from "../modules/user/controllers/getSuperUsersController";
import GetTopCountriesController from "../modules/user/controllers/getTopCountriesController";
import GetTeamsInsightsController from "../modules/user/controllers/getTeamsInsightsController";
import GetActiveUsersPerDayController from "../modules/user/controllers/getActiveUsersPerDayController";

const IndexRouter = Router();

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const apiInfoController = new ApiInfoController();
const createUsersController = new CreateUsersController();
const getSuperUsersController = new GetSuperUsersController();
const getTopCountriesController = new GetTopCountriesController();
const getTeamsInsightsController = new GetTeamsInsightsController();
const getActiveUsersPerDayController = new GetActiveUsersPerDayController();

IndexRouter.get("/", apiInfoController.handle);

IndexRouter.post("/users", upload.single("users"), createUsersController.handle);
IndexRouter.get("/superusers", getSuperUsersController.handle);
IndexRouter.get("/top-countries", getTopCountriesController.handle);
IndexRouter.get("/team-insights", getTeamsInsightsController.handle);
IndexRouter.get("/active-users-per-day", getActiveUsersPerDayController.handle);

export default IndexRouter;