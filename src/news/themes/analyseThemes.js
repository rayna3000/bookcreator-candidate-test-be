/**
 * Enum for theme roles
 * @readonly
 * @enum string
 */
export const Role = Object.freeze({
    PROBLEM: 'Problem',
    JOY: 'Joy',
    JUST_A_THING: 'Just a thing'
});

export const analyseThemes = async (news, languageClient) => {
    const document = {
        content: news,
        type: 'PLAIN_TEXT',
    };
    const [entitySentimentAnalysis] = await languageClient.analyzeEntitySentiment({document});
    const entities = entitySentimentAnalysis.entities
    const themes = entities.map(extractThemeFromEntity)
    return themes
}

const extractThemeFromEntity = (entity) => {
    let role = Role.JUST_A_THING

    if (entity.sentiment.score > 0) {
        role = Role.JOY
    } else if (entity.sentiment.score < 0) {
        role = Role.PROBLEM
    }
    
    const theme = {
        name: entity.name,
        role
    }

    return theme
}