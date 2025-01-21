export const validateShareNewsRequest = (request) => {
    if(!('news' in request.body)) {
        throw new Error('Please provide a news property in your request body');
    }
    if(typeof request.body.news !== 'string' || request.body.news.length === 0) {
        throw new Error('News must be a nonempty string');
    }
}