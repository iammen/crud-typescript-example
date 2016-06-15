// Needed packages
import * as path from "path";
import * as http from "http";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as methodOverride from "method-override";
import HTTP_STATUS_CODES from "http-status-enum";
import {OperationResponse} from "./models/pojos/OperationResponse";
import {CustomerRoute} from "./routes/CustomerRoute";

class ExpressApp {
    // Public members
    app: express.Application;

    // Constructor
    constructor () {
        this.app = express();
        this._setupBaseConfig();
        this._setupRoutes();
        this._setupErrorHandler();
    }

    // Static bootstrap method
    static bootstrap (): ExpressApp {
        return new ExpressApp();
    }

    // Configure server
    private _setupBaseConfig (): void {
        // Set up static folder
        //this.app.use(express.static(path.join(__dirname + "public")));

        // Configure our app to use body parser. It let us get the json data from POST.
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());

        // Look in urlencoded POST bodies and delete it
        this.app.use(methodOverride((req: express.Request, res: express.Response) => {
            if (req.body && typeof req.body === "object" && "_method" in req.body) {
                var method: string = req.body._method;
                delete req.body._method;

                return method;
            }
        }));
    }

    private _setupErrorHandler (): void {
        // catch 404 and forward to error handler
        this.app.use(function (req: express.Request, res: express.Response,
            next: express.NextFunction): void {
            var err: any = new Error("No Route Found.");
            err.status = HTTP_STATUS_CODES.NOT_FOUND;
            next(err);
        });

        // development error handler
        // will return error message
        if (this.app.get("env") === "development") {
            this.app.use((err: any, req: express.Request, res: express.Response,
                next: express.NextFunction) => {

                res.status(err.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
                res.jsonp(OperationResponse.failed(err.message));
            });
        }

        // production error handler
        // no stacktraces leaked to user
        this.app.use((err: any, req: express.Request, res: express.Response,
            next: express.NextFunction) => {

            res.status(err.status || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
            res.jsonp(OperationResponse.failed(err.message));
        });
    }

    // Configure all routes
    private _setupRoutes (): void {
        // Enable cross origin resource sharing
        this.app.all("/*", (req: express.Request, res: express.Response, next: express.NextFunction) => {
            // CORS headers
            res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
            res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
            // Set custom headers for CORS
            res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Access-Token,X-Key");

            if (req.method === "OPTIONS") {
                res.status(HTTP_STATUS_CODES.OK).end();
            } else {
                next();
            }
        });

        this.app.use("/", new CustomerRoute().routes);
    }
}

let server: ExpressApp = ExpressApp.bootstrap();
export = server.app;