// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import express from 'express';
import * as language from '@google-cloud/language'
import {validateShareNewsRequest} from './middleware/validateNews.js'
import {handleExceptions} from './middleware/handleExceptions.js'
import {submitNews} from './news/submitNews.js'
import {pinoHttp, logger} from './utils/logging.js'
import {getDbConnection} from './utils/dbConnection.js'

// import {Firestore} from '@google-cloud/firestore';

// const db = new Firestore({
//   projectId: 'YOUR_PROJECT_ID',
//   keyFilename: '/path/to/keyfile.json',
// });

const app = express();

app.use(pinoHttp);
app.use(express.json());

app.get('/', async (req, res) => {
  res.send({
    message: 'Welcome to the "Happy for you" or "Sorry that happened" API! Feel free to share your happy or sad news using the POST /sharenews endpoint under the JSON property "news".'
  })
})

app.post('/sharenews', validateShareNewsRequest, async (req, res, next) => {

  const client = new language.LanguageServiceClient()
  const db = await getDbConnection()
  const newsToReactTo = req.body.news
  try {
    const reaction = await submitNews(newsToReactTo, client, db)

    res.send({
      message: reaction,
      ...reaction
    })
  } catch (e) {
    // next(e)
    res.send(e.message)
  }
})

// app.use(handleExceptions)

export default app
