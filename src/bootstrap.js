import { globalErrorHandling } from "./middleware/globalErrorHandling.js"


export const bootstrap = (app) => {







    app.get('/', (req, res) => res.send('Hello World!'))




    //NOTE - Global Error Handling 
    app.use(globalErrorHandling)

}

