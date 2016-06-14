/*
 * Needed packages
 */
import * as path from "path";
import * as http from "http";
import * as express from "express";
import * as bodyParser from "body-parser";

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
        //const port: number = process.env.PORT || 8080;

        // Set up static folder
        //this.app.use(express.static(path.join(__dirname + "public")));

        // Configure our app to use body parser. It let us get the json data from POST.
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
    }

    private _setupErrorHandler (): void {
        // catch 404 and forward to error handler
        this.app.use(function (req: express.Request, res: express.Response,
            next: express.NextFunction): void {
            var err: any = new Error("Not Found");
            err.status = 404;
            next(err);
        });

        // development error handler
        // will print stacktrace
        if (this.app.get("env") === "development") {
            this.app.use((err: any, req: express.Request, res: express.Response,
                next: express.NextFunction) => {

                res.status(err.status || 500);
                res.render("error", {
                    message: err.message,
                    error: err
                });
            });
        }

        // production error handler
        // no stacktraces leaked to user
        this.app.use((err: any, req: express.Request, res: express.Response,
            next: express.NextFunction) => {

            res.status(err.status || 500);
            res.render("error", {
                message: err.message,
                error: {}
            });
        });
    }

    // Configure all routes
    private _setupRoutes (): void {
        //this.app.use("/", Lab1Route);
    }
}

let server: ExpressApp = ExpressApp.bootstrap();
export = server.app;