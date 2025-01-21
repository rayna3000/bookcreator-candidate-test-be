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
    "message": "Sorry that happened!"
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
- Create a new project with Natural Language API enabled - follow [the Quickstart guide for setting up Natural Language API] up to and including the step:
```
gcloud init
```
The above should be run within the folder for this project.
- Then, run the following command in the terminal in order to authenticate your local project with the Natural Language API:
```
gcloud auth application-default login
```

### Running
To run the local server, simply:
```
npm run dev
```



## License

This library is licensed under Apache 2.0. Full license text is available in [LICENSE](LICENSE).
