from fastapi import FastAPI
from scraper.scraper import scrape

app = FastAPI()


@app.post("/tweetanalysis")
async def root(query: str, limit: int):
    return {scrape(f"{query} lang:en", limit)}
