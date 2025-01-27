export const getNews = async (db) => {
    const allNewsSnapshot = await db.collection('submissions').get()
    const allNews = allNewsSnapshot.docs.map(item => item.data())
    return {
        message: 'Successfully retrieved all submissions',
        data: allNews
    }
}