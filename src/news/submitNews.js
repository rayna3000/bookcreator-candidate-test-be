import {analyseThemes} from './themes/analyseThemes.js'
import {classifyMood, getMoodReaction} from './reaction/generateReactionToNews.js'

/**
 * saves to db: {
 *  news: 'i ate pizza',
 *  mood: 'Good',
 *  themes: [
 *      {
 *          'name': 'pizza',
 *          'role': 'joy'
 *      }
 *  ],
 *  reaction: 'Happy for you!'
 * }
 * responds with the reaction
 */
export const submitNews = async (news, languageClient, db) => {
    const mood = await classifyMood(news, languageClient)
    const themes = await analyseThemes(news, languageClient)
    const reaction = getMoodReaction(mood)
    
    const newsDbEntry = {
        news,
        mood,
        themes,
        reaction
    }

    const docRef = await db.collection('submissions').add(newsDbEntry);

    return {
        reaction,
        message: `Your news have been submitted to our system under the id ${docRef.id}`
    }
}


