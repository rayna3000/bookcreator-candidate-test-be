import {ClientError} from '../utils/customErrors.js'

export const handleExceptions = (err, req, res, next) => {
    let responseMessage = ''
    if (err instanceof ClientError) {
        res.statusCode = 400
        responseMessage = err.message
    } else {
        res.statusCode = 500
        responseMessage = 'Sorry, something went wrong while processing the request.'
    }
    res.send({status: res.statusCode, message: responseMessage})
}