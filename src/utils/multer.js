import multer from "multer";
import { AppError } from "./AppError.js";

export const fileUpload = () => {


    const storage = multer.diskStorage({})


    function fileFilter(req, file, cb) {

        cb(null, false)

        if (file.mimetype.startsWith('image')) {
            cb(null, true)

        } else {
            cb(new AppError('I don\'t have a clue!'))

        }



    }
    const upload = multer({ storage: storage, fileFilter })

    return upload.single('imgCover')
}