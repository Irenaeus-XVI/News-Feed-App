import { globalErrorHandling } from "./middleware/globalErrorHandling.js"
import { AppError } from "./utils/AppError.js"
import userRoutes from '../src/modules/user/user.routes.js'
import authRoutes from '../src/modules/auth/auth.routes.js'
import postRoutes from '../src/modules/post/post.routes.js'
import commentRoutes from '../src/modules/comment/comment.routes.js'
import likeRoutes from '../src/modules/like/like.routes.js'

export const bootstrap = (app) => {

    app.use('/api/v1/user', userRoutes)
    app.use('/api/v1/auth', authRoutes)
    app.use('/api/v1/post', postRoutes)
    app.use('/api/v1/comment', commentRoutes)
    app.use('/api/v1/like', likeRoutes)

    app.get('/', (req, res) => res.send('Hello World!'))


    //NOTE - Handle Invalid Paths
    app.all('*', (req, res, next) => {
        next(new AppError('Invalid Path', 404))
    })


    //NOTE - Global Error Handling 
    app.use(globalErrorHandling)

}

