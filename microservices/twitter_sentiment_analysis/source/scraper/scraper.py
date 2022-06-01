# from turtle import pd
import snscrape.modules.twitter as sntwitter
# import pandas as pd
from sentiment_analysis.sentiment import perform_sentiment
from sentiment_analysis.cleaner import preprocess


# query = "#pakistan lang:en"

# maxTweets = 3000

def scrape(query: str , limit: int, analysisId: str):
    tweets_list = []
    query = query + " lang:en"
    
    # Using TwitterSearchScraper to scrape data and append tweets to list
    for i,tweet in enumerate(sntwitter.TwitterSearchScraper(query).get_items()):
        if i >= limit:
            break
        
        tweet.content = preprocess(tweet.content)
        
        tweets_list.append({"tweetUserName": tweet.user.username, "tweetId": tweet.id, "tweetDate": tweet.date, "tweetContent": tweet.content, "tweetUrl": tweet.url, "sentiment": perform_sentiment(tweet.content), "analysisId": analysisId})
    
    return tweets_list


## Creating a dataframe from the tweets list above
# tweets_df2 = pd.DataFrame(tweets_list, columns=['Username', 'Tweet Id', 'Date/time', 'Text'])

## Display first 5 entries from dataframe
# tweets_df2.head()

## Export dataframe into a CSV
# tweets_df2.to_csv('tweets.csv', sep=',', index=False)

# print(scrape("#imrankhan lang:en", 1))