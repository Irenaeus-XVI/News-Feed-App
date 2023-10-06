import { globalErrorHandling } from "./middleware/globalErrorHandling.js"
import { AppError } from "./utils/AppError.js"


export const bootstrap = (app) => {







    app.get('/', (req, res) => res.send('Hello World!'))


    //NOTE - Handle Invalid Paths
    app.all('*', (req, res, next) => {
        next(new AppError('Invalid Path', 404))
    })


    //NOTE - Global Error Handling 
    app.use(globalErrorHandling)

}

