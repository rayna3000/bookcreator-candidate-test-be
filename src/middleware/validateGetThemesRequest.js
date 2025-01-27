import {ClientError} from '../utils/customErrors.js'
import {ThemesOrder} from '../news/themes/getThemes.js'

export const validateGetThemesFilter = (req, res, next) => {
    if('orderBy' in req.query && !Object.values(ThemesOrder).includes(req.query.orderBy) ) {
        throw new ClientError('Query parameter orderBy must be either biggestProblem or biggestJoy')
    }
    next()
}