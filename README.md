# "Happy for you" or "Sorry that happened" API
Have you ever been told some news and wondered whether you should react with "Happy for you" or "Sorry that happened"?

This API allows you to send a POST request with some news, and it uses the Google Natural Language API to respond with either "Happy for you" or "Sorry that happened".

See it deployed here: https://raynas-gcp-demo-940535980876.europe-west1.run.app/

This API is inspired by the meme "I ain't reading all that, happy for u tho, or sorry that happened".

This project was created using Google Cloud Platform's [cloud-run-microservice-template-nodejs](https://github.com/GoogleCloudPlatform/cloud-run-microservice-template-nodejs) template following their guide [Quickstart: Deploy to Cloud Run from a git repository](https://cloud.google.com/run/docs/quickstarts/deploy-continuously), in order to continuously deploy on every push to the main branch.

## API endpoints

### GET /

Query parameters: none

Response:

```json
{
    "message": "Welcome to the \"Happy for you\" or \"Sorry that happened\" API! Feel free to share your happy or sad news using the POST /sharenews endpoint under the JSON property \"news\"."
}
```

### POST /sharenews
- Submits the news to the system (see `GET /news` for details on what is submitted)
- Responds depending on the mood of the news with either "Happy for you!", "Sorry that happened", or "And how do you feel about that?"

Query parameters: none

Request parameters:
- `news` - a nonempty string, for example "I missed my bus" or "I won the lottery"

Example request:
```json
{
    "news": "I missed my bus"
}
```

Response:
```json
{
    "reaction": "Sorry that happened!",
    "message": "Your news have been submitted to our system under the id KsR0GtX6B8mLkbOFWp3Y“
}
```

### GET /news
Retrieves all the news that have been submitted to the system.

Query parameters: none

Response:
```json
{
    "message": "Successfully retrieved all submissions",
    "data": [
        {
            "news": "I had an amazing pizza!",
            "mood": "Good",
            "reaction": "Happy for you!",
            "themes": [
                {
                    "name": "pizza",
                    "role": "Joy"
                }
            ]
        },
        {
            "news": "I had a terrible pizza!",
            "mood": "Bad",
            "reaction": "Sorry that happened!",
            "themes": [
                {
                    "name": "pizza",
                    "role": "Problem"
                }
            ]
        },
        {
            "news": "I had a pizza at a restaurant",
            "mood": "Neutral",
            "reaction": "And how do you feel about that?",
            "themes": [
                {
                    "name": "pizza",
                    "role": "Just a thing"
                },
                {
                    "name": "restaurant",
                    "role": "Just a thing"
                }
            ]
        }
    ]
}
```

### GET /themes
Retrieves all the themes that exist in the submissions on the system, along with counts of how often they have occured as a `Joy`, `Problem` or `Just a thing`.

Query parameters: 
 - `orderBy` - can be either `biggestProblem` or `biggestJoy`

Response:
```json
{
    "message": "Successfully retrieved all submissions",
    "data": [
        {
            "news": "I had an amazing pizza!",
            "mood": "Good",
            "reaction": "Happy for you!",
            "themes": [
                {
                    "name": "pizza",
                    "role": "Joy"
                }
            ]
        },
        {
            "news": "I had a terrible pizza!",
            "mood": "Bad",
            "reaction": "Sorry that happened!",
            "themes": [
                {
                    "name": "pizza",
                    "role": "Problem"
                }
            ]
        },
        {
            "news": "I had a pizza at a restaurant",
            "mood": "Neutral",
            "reaction": "And how do you feel about that?",
            "themes": [
                {
                    "name": "pizza",
                    "role": "Just a thing"
                },
                {
                    "name": "restaurant",
                    "role": "Just a thing"
                }
            ]
        }
    ]
}
```


## Local setup instructions

To run this repo, you must have a [Google Cloud Platform account on the free tier](https://cloud.google.com/free).

### Installation

- Clone this repo
- Install all the dependencies:
```
npm i
```
- Create a new project with Natural Language API enabled - follow [the Quickstart guide for setting up Natural Language API](https://cloud.google.com/natural-language/docs/setup) up to and including the step:
```
gcloud init
```
- Then, run the following command in the terminal in order to authenticate your local project with the Natural Language API:
```
gcloud auth application-default login
```

### Running
To run the local server, simply:
```
npm run dev
```

### Testing
To run the unit tests, simply:
```
npm run test
```

## License

This library is licensed under Apache 2.0. Full license text is available in [LICENSE](LICENSE).
