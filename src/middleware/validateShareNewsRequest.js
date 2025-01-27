import {ClientError} from '../utils/customErrors.js'

export const validateShareNewsRequest = (req, res, next) => {
    if(!('news' in req.body)) {
        throw new ClientError('Please provide a news property in your request body')
    }
    if(typeof req.body.news !== 'string' || req.body.news.length === 0) {
        throw new ClientError('News must be a nonempty string')
    }
    next()
}