import {Role} from './analyseThemes.js'

/**
 * Enum for theme roles
 * @readonly
 * @enum string
 */
export const ThemesOrder = Object.freeze({
    BIGGEST_PROBLEM: 'biggestProblem',
    BIGGEST_JOY: 'biggestJoy',
});

export const getThemes = async (db, orderBy) => {
    const allNewsSnapshot = await db.collection('submissions').get()

    const allNews = allNewsSnapshot.docs.map(item => item.data())
    const allThemesWithDuplicates =  allNews.reduce(
        (themesSoFar, currentValue) => themesSoFar.concat(currentValue.themes),
        []
    )
    let allThemesWithCounts = removeDuplicatesAndAddCounts(allThemesWithDuplicates)

    if(orderBy) {
        allThemesWithCounts = orderThemes(allThemesWithCounts, orderBy)
    }
    return {
        message: "Successfully retrieved themes from all submissions",
        data: allThemesWithCounts
    }
}

const removeDuplicatesAndAddCounts = (themesWithDuplicates) => {
    const themesWithCounts = new Map()
    themesWithDuplicates.forEach(theme => {
        const occurenceIncrements = {
            asProblem: theme.role === Role.PROBLEM ? 1 : 0,
            asJoy: theme.role === Role.JOY ? 1 : 0,
            asJustAThing: theme.role === Role.JUST_A_THING ? 1 : 0
        }
        const existingEntry = themesWithCounts.get(theme.name)
        if(existingEntry) {
            themesWithCounts.set(theme.name, {
                name: theme.name,
                occurences: {
                    asProblem: existingEntry.occurences.asProblem + occurenceIncrements.asProblem,
                    asJoy: existingEntry.occurences.asJoy + occurenceIncrements.asJoy,
                    asJustAThing: existingEntry.occurences.asJustAThing + occurenceIncrements.asJustAThing,
                }
            })
        } else {
            themesWithCounts.set(theme.name, {
                name: theme.name,
                occurences: occurenceIncrements
            })
        }
    })
    return Array.from(themesWithCounts, ([name, value]) => value)
}

const sortByBiggestProblem = (firstTheme, secondTheme) => {
    return secondTheme.occurences.asProblem - firstTheme.occurences.asProblem
}

const sortByBiggestJoy = (firstTheme, secondTheme) => {
    return secondTheme.occurences.asJoy - firstTheme.occurences.asJoy
}

const orderFunctionMap = new Map()
orderFunctionMap.set(ThemesOrder.BIGGEST_PROBLEM, sortByBiggestProblem)
orderFunctionMap.set(ThemesOrder.BIGGEST_JOY, sortByBiggestJoy)

const orderThemes = (themes, orderBy) => {
    return themes.sort(orderFunctionMap.get(orderBy))
}