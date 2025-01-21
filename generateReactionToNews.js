export const generateReactionToNews = async (news, languageClient) => {
 
    const document = {
      content: news,
      type: 'PLAIN_TEXT',
    };
    const [result] = await languageClient.analyzeSentiment({document: document});
    const sentimentScore = result.documentSentiment.score;
    
    if(sentimentScore > 0) {
        return 'Happy for you!'
    }

    if (sentimentScore < 0) {
        return 'Sorry that happened!'
    }
    
    return 'And how do you feel about that?'
}