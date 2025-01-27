/**
 * Enum for moods
 * @readonly
 * @enum string
 */
const Mood = Object.freeze({
    GOOD: 'Good',
    BAD: 'Bad',
    NEUTRAL: 'Neutral'
});

const MoodReaction = new Map([
    [Mood.GOOD, 'Happy for you!'],
    [Mood.BAD, 'Sorry that happened!'],
    [Mood.NEUTRAL, 'And how do you feel about that?']
])

export const generateReactionToNews = async (news, languageClient, db) => {
    const document = {
      content: news,
      type: 'PLAIN_TEXT',
    };
    const [sentiment] = await languageClient.analyzeSentiment({document: document});
    const [entities] = await languageClient.analyzeEntities({document: document});
    const [entitySentiments] = await languageClient.analyzeEntitySentiment({document: document});
    // const [syntax] = await languageClient.analyzeSyntax({document: document});
    // const [classification] = await languageClient.classifyText({document: document});

    const sentimentScore = sentiment.documentSentiment.score;
    const mood = classifyMood(sentimentScore)
    
    const allData = {
        sentiment, 
        entities, 
        entitySentiments, 
        // classification
    }
    allData.message = getMoodReaction(mood)
    

    const dbEntry = {
        news,
        mood,
        // entitySentiments,
        // classification,
        reaction: allData.message
    }

    const docRef = db.collection('submissions').doc('submission');

    await docRef.set(dbEntry);

    return allData
}

const classifyMood = (sentimentScore) => {
    if(sentimentScore > 0) {
        return Mood.GOOD
    } else if (sentimentScore < 0) {
        return Mood.BAD
    } else {
        return Mood.NEUTRAL
    }
}

const getMoodReaction = mood => MoodReaction.get(mood)

