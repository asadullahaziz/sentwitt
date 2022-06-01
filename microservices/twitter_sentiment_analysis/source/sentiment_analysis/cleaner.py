import re

# Preprocess text (username and link placeholders)
def preprocess(text: str):
    # new_text = []
    
    text = text.replace("\n", " ")
    text = re.sub(r"http\S+", "", text)
    text = re.sub(r"www.\S+", "", text)
    
    # for t in text.split(" "):
    #     t = '@user' if t.startswith('@') and len(t) > 1 else t
    #     t = 'http' if t.startswith('http') else t
    #     new_text.append(t)
    # return " ".join(new_text)
    return text