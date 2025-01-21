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
import * as language from '@google-cloud/language';
import {validateShareNewsRequest} from './validation.js';
import {generateReactionToNews} from './generateReactionToNews.js';

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
  res.send({
    message: 'Welcome to the "Happy for you" or "Sorry that happened" API! Feel free to share your happy or sad news using the POST /sharenews endpoint under the JSON property "news".'
  });
});

app.post('/sharenews', async (req, res) => {
  try {
    validateShareNewsRequest(req);
  } catch (e) {
    res.statusCode = 400;
    res.send({
      message: e.message
    })
  }
  const client = new language.LanguageServiceClient();
  const newsToReactTo = req.body.news;
  try {
    const reaction = await generateReactionToNews(newsToReactTo, client);
    res.send({
      message: reaction
    })
  } catch (e) {
    res.statusCode = 500;
    res.send({
      message: 'Something went wrong while trying to generate a reaction to your news'
    })
  }
})

export default app;
