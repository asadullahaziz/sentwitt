# from turtle import pd
import snscrape.modules.twitter as sntwitter
# import pandas as pd
from sentiment_analysis.sentiment import perform_sentiment


# query = "#pakistan lang:en"

# maxTweets = 3000

def scrape(query: str , limit: int):
    tweets_list = []
    
    # Using TwitterSearchScraper to scrape data and append tweets to list
    for i,tweet in enumerate(sntwitter.TwitterSearchScraper(query).get_items()):
        if i>limit:
            break
        tweets_list.append([tweet.user.username, tweet.id, tweet.date, tweet.content, tweet.url, perform_sentiment(tweet.content)])
    
    return tweets_list


## Creating a dataframe from the tweets list above
# tweets_df2 = pd.DataFrame(tweets_list, columns=['Username', 'Tweet Id', 'Date/time', 'Text'])

## Display first 5 entries from dataframe
# tweets_df2.head()

## Export dataframe into a CSV
# tweets_df2.to_csv('tweets.csv', sep=',', index=False)

# print(scrape("#McDonaldPakistan lang:en", 1))