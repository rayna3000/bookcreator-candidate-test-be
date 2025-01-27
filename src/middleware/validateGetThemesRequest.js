import {ClientError} from '../utils/customErrors.js'
import {ThemesOrder} from '../news/themes/getThemes.js'

export const validateGetThemesFilter = (req, res, next) => {
    if('orderBy' in req.query && !(req.query.orderBy in ThemesOrder) ) {
        throw new ClientError('Query parameter orderBy must be either Biggest problem or Biggest joy')
    }
    next()
}