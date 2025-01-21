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
import {pinoHttp, logger} from './utils/logging.js';
import {validateShareNewsRequest} from './validation.js';
import {generateReactionToNews} from './generateReactionToNews.js';

const app = express();

// Use request-based logger for log correlation
app.use(pinoHttp);
app.use(express.json());

// Example endpoint
app.get('/', async (req, res) => {
  // Use basic logger without HTTP request info
  logger.info({logField: 'custom-entry', arbitraryField: 'custom-entry'}); // Example of structured logging
  // Use request-based logger with log correlation
  req.log.info('Child logger with trace Id.'); // https://cloud.google.com/run/docs/logging#correlate-logs

   // Imports the Google Cloud client library
  //  const language = require('@google-cloud/language');

   // Instantiates a client
   const client = new language.LanguageServiceClient();
 
   // The text to analyze
   const text = 'Hello, world!';
 
   const document = {
     content: text,
     type: 'PLAIN_TEXT',
   };
 
   // Detects the sentiment of the text
   const [result] = await client.analyzeSentiment({document: document});
   const sentiment = result.documentSentiment;
 
   console.log(`Text: ${text}`);
   console.log(`Sentiment score: ${sentiment.score}`);
   console.log(`Sentiment magnitude: ${sentiment.magnitude}`);

  res.send(sentiment);
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
