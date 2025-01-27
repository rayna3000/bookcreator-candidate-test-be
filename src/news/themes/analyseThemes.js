export const analyseThemes = async (news, languageClient) => {
    const document = {
        content: news,
        type: 'PLAIN_TEXT',
    };
    const [entitySentiments] = await languageClient.analyzeEntitySentiment({document});
    // const themes = entitySentiments.map(extractThemeFromEntitySentiment)
    // return themes
    return []
}

const extractThemeFromEntitySentiment = (entitySentiment) => {

}