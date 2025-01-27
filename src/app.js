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
import {validateShareNewsRequest} from './middleware/validateShareNewsRequest.js'
import {validateGetThemesFilter} from './middleware/validateGetThemesRequest.js'
import {handleExceptions} from './middleware/handleExceptions.js'
import {submitNews} from './news/submitNews.js'
import {pinoHttp, logger} from './utils/logging.js'
import {getDbConnection} from './utils/dbConnection.js'
import {getThemes} from './news/themes/getThemes.js';
import {getNews} from './news/getNews.js'

const app = express();

app.use(pinoHttp);
app.use(express.json());

app.get('/', async (req, res) => {
  res.send({
    message: 'Welcome to the Happy for you or Sorry that happened API! Feel free to share your happy or sad news using the POST /sharenews endpoint under the JSON property "news".'
  })
})

app.post('/sharenews', validateShareNewsRequest, async (req, res, next) => {

  const client = new language.LanguageServiceClient()
  const db = await getDbConnection()
  const newsToReactTo = req.body.news
  try {
    const responseBody = await submitNews(newsToReactTo, client, db)
    res.send(responseBody)
  } catch (e) {
    next(e)
  }
})

app.get('/news', async (req, res, next) => {
  const db = await getDbConnection()
  try {
    const responseBody = await getNews(db)
    res.send(responseBody)
  } catch (e) {
    next(e)
  }
})

app.get('/themes', validateGetThemesFilter, async (req, res, next) => {
  const orderBy = 'orderBy' in req.query ? req.query.orderBy : undefined
  const db = await getDbConnection()
  try {
    const responseBody = await getThemes(db, orderBy)
    res.send(responseBody)
  } catch (e) {
    next(e)
  }
})

// app.use(handleExceptions)
app.use((err, req, res, next) => {
  res.send(err)
})

export default app
