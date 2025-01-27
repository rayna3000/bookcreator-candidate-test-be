export const generateReactionToNews = async (news, languageClient, db) => {
 
    const document = {
      content: news,
      type: 'PLAIN_TEXT',
    };
    const [sentiment] = await languageClient.analyzeSentiment({document: document});
    const [entities] = await languageClient.analyzeEntities({document: document});
    const [entitySentiments] = await languageClient.analyzeEntitySentiment({document: document});
    // const [syntax] = await languageClient.analyzeSyntax({document: document});
    const [classification] = await languageClient.classifyText({document: document});

    const sentimentScore = sentiment.documentSentiment.score;

    const allData = {
        sentiment, entities, entitySentiments, classification
    }
    
    if(sentimentScore > 0) {
        allData.message = 'Happy for you!'
    } else if (sentimentScore < 0) {
        allData.message = 'Sorry that happened!'
    } else {
        allData.message = 'And how do you feel about that?'
    }

    const dbEntry = {
        news,
        sentiment,
        entitySentiments,
        classification,
        reaction: allData.message
    }

    const docRef = db.collection('submissions').doc('submission');

    await docRef.set(dbEntry);

    return allData
}