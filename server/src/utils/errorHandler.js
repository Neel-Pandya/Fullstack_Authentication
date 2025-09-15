import ApiResponse from "./ApiResponse.js"

const errorHandler = (err, req, res, next) => {
    res.status(err.statusCode || 400).json(new ApiResponse(400 || err.statusCode, err.message))
}

export default errorHandler;