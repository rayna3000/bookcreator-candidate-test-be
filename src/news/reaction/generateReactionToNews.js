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

export const classifyMood = async (news, languageClient) => {
    const document = {
        content: news,
        type: 'PLAIN_TEXT',
    };

    const [sentiment] = await languageClient.analyzeSentiment({document});
    const score = sentiment.documentSentiment.score
    if(score > 0) {
        return Mood.GOOD
    } else if (score < 0) {
        return Mood.BAD
    } else {
        return Mood.NEUTRAL
    }
}

export const getMoodReaction = mood => MoodReaction.get(mood)