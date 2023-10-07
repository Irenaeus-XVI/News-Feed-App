import { ApiFeatures } from "../ApiFeatures.js";
import { AppError } from "../AppError.js";
import { handleAsyncError } from "../handleAsyncError.js";

export const deleteOne = (model, name) => {
    return handleAsyncError(async (req, res, next) => {
        let { id } = req.params;
        const document = await model.findByIdAndDelete(id);
        let response = {}
        response[name] = document
        !document && next(new AppError(` ${name} Not Found.`, 404));
        document && res.status(201).json({ message: "success", ...response });

    });




}

export const getAll = (apiModel, name) => {
    return handleAsyncError(async (req, res, next) => {
        //NOTE - build query
        let apiFeatures = new ApiFeatures(apiModel.find(), req.query).paginate().filter().search().sort().fields()
        //NOTE - execute query
        const document = await apiFeatures.mongooseQuery
        let response = {}
        response[name] = document
        res.status(201).json({ page: +apiFeatures.page, message: "success", ...response });
    })








}



export const getSpecific = (apiModel, name) => {
    return handleAsyncError(async (req, res, next) => {

        const { id } = req.params;

        const document = await apiModel.findById(id)
        let response = {}
        response[name] = document
        !document && next(new AppError(`${name} Not Found.`, 404))
        document && res.status(201).json({ message: "success", ...response });
    })

}


