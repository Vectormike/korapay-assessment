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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var body_parser_1 = __importDefault(require("body-parser"));
var compression_1 = __importDefault(require("compression"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var morgan_1 = __importDefault(require("morgan"));
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes"));
var cors = require("cors");
var limiter_1 = require("./middleware/limiter");
require('./config/database');
var logger_1 = __importDefault(require("./logger"));
var redis_connection_1 = require("./redis.connection");
var app = express_1.default();
// client();
var morganFormat = process.env.NODE_ENV !== "production" ? "dev" : "combined";
app.use(morgan_1.default('combined', { stream: logger_1.default.stream }));
app.use(compression_1.default());
app.use(cookie_parser_1.default());
// initalize passport
app.use(cors({
    origin: '*',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200,
    credentials: true // allow session cookie from browser to pass through
}));
var runRedisAsync = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            redis_connection_1.redisClient.on("message", function (channel, message) {
                console.log("Received data :" + message);
            });
        }
        catch (error) {
            return [2 /*return*/, console.log("fail to connect to redis")];
        }
        return [2 /*return*/];
    });
}); };
runRedisAsync();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(limiter_1.rateLimiter);
app.set("port", process.env.PORT || 3000);
app.use(routes_1.default);
app.use(function (req, res, next) {
    return res.status(404).send({
        status: "Not Found",
        status_code: 404,
    });
});
app.use(function (err, req, res, next) {
    console.log(req.url);
    if (req.url != '/api/auth/login') {
        logger_1.default.info("request>>" + JSON.stringify(req.body));
    }
    if (res.headersSent) {
        return next(err);
    }
    var statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
        status: err.status,
        statusCode: statusCode,
        message: err.message,
        error: process.env.NODE_ENV === "development" ? err : undefined,
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map