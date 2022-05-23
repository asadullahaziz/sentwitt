from fastapi import FastAPI, Request
from scraper.scraper import scrape
from sentiment_analysis.sentiment import perform_sentiment

app = FastAPI()


@app.post("/tweetanalysis")
async def tweetAnalysis(request: Request):
    data = await request.json()
    return scrape(data["query"], data["limit"], data["analysisId"])

@app.post("/sentiment_analysis")
async def sentimentAnalysis(request: Request):
    data = await request.json()
    result = perform_sentiment(data["text"])
    return {"sentiment": result}
