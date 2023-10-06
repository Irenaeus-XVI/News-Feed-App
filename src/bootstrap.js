import { globalErrorHandling } from "./middleware/globalErrorHandling.js"
import { AppError } from "./utils/AppError.js"
import userRoutes from '../src/modules/user/user.routes.js'

export const bootstrap = (app) => {

    app.use('/api/v1/user', userRoutes)

    app.get('/', (req, res) => res.send('Hello World!'))


    //NOTE - Handle Invalid Paths
    app.all('*', (req, res, next) => {
        next(new AppError('Invalid Path', 404))
    })


    //NOTE - Global Error Handling 
    app.use(globalErrorHandling)

}

