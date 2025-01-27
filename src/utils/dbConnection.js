import {Firestore} from '@google-cloud/firestore'
import {fetchProjectId} from './metadata.js'
import {homedir} from 'os'

export const getDbConnection = async () => {
    const projectId = await fetchProjectId()
    const db = new Firestore({
        projectId,
        keyFilename: homedir() + '/.config/gcloud/application_default_credentials.json',
    })
    return db
}