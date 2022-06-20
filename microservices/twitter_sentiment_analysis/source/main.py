from fastapi import FastAPI, Request
from scraper.scraper import scrape
from sentiment_analysis.sentiment import perform_sentiment
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/tweetAnalysis")
async def tweetAnalysis(request: Request):
    data = await request.json()
    return scrape(data["query"], data["limit"], data["analysisId"])

@app.post("/sentimentAnalysis")
async def sentimentAnalysis(request: Request):
    data = await request.json()
    result = perform_sentiment(data["text"])
    return {"sentiment": result}
