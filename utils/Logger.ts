import {pino} from 'pino'
import {pinoHttp} from 'pino-http'

//Configure the main logger instance for general app logging
const logger = pino({
    level: 'info',   //Default logging level
    transport: {    //Configuration logs to console
        target: 'pino-pretty',
        options: {
            destination: 1, //Output to stdout
            colorize: true, //Enable colorful output in console
            levelFirst: true,   //Show log level before message
            messageFormat: '{msg}', //Format the log message
            ignore: 'pid.hostname', //Exclude process ID and hostname
            customLevels: {
                error: 50, 
                warn: 40, 
                debug: 20, 
                trace: 10
            },
            customColors: 'error:red,warn:yellow,info:green,debug:blue,trace:magenta'
        }
    }
});

const httpLogger = pinoHttp ({
    logger, //Use the main logger instance from above
    customLogLevel: (res, err) => {   //Logic to get log level based on HTTP response

        if(res.statusCode && res.statusCode >= 400 && res.statusCode < 500) return 'warn';  //Client errors are warnings
        if((res.statusCode&& res.statusCode >=500) || err) return 'error'   //Server errors or exceptions are errors
        return 'info'
    },
    //Optional: Define properties to ignore from the request/respose to keep logs clean
    //ignorePaths: ['healthcheck']
});

export { logger, httpLogger };