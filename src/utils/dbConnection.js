import {Firestore} from '@google-cloud/firestore'
import {fetchProjectId, fetchServiceLevelCredentials} from './metadata.js'
import {homedir} from 'os'

export const getDbConnection = async () => {
    const projectId = await fetchProjectId()
    // const defaultServiceCredentials = await fetchServiceLevelCredentials()
    //console.log(defaultServiceCredentials)
    /*const db = new Firestore({
        projectId,
        keyFilename: homedir() + '/.config/gcloud/application_default_credentials.json',
    })*/
    const db = new Firestore()
    // const db = getFirestore(app);
    return db
}