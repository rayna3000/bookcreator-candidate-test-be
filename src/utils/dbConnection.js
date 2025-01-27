import {Firestore} from '@google-cloud/firestore'

export const getDbConnection = async () => {
    const db = new Firestore()
    return db
}