from nltk.corpus.reader.wordnet import WordNetError
from nltk.corpus import wordnet, brown
from nltk import FreqDist
import requests
import random
import json
import tqdm
import re

random.seed(16)

# import nltk
# nltk.download('wordnet')
# nltk.download('omw-1.4')
# nltk.download('brown')

def divide_chunks(l, n):
    for i in range(0, len(l), n):
        yield l[i:i + n]

def run():
    profanity_url = "https://raw.githubusercontent.com/LDNOOBW/List-of-Dirty-Naughty-Obscene-and-Otherwise-Bad-Words/master/en"
    profanities_list = requests.get(profanity_url).text.splitlines()
    profanities_list = [item.strip().lower() for item in profanities_list]


    names_url = "https://raw.githubusercontent.com/dominictarr/random-name/master/names.txt"
    names_list = requests.get(names_url).text.splitlines()
    names_list = [item.strip().lower() for item in names_list]

    months_list = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    months_list = [item.strip().lower() for item in months_list]

    days_list = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    days_list = [item.strip().lower() for item in days_list]

    words = FreqDist(i.lower() for i in brown.words())
    data = []
    for word, _ in tqdm.tqdm(words.most_common()):
        if len(word) < 4:
            continue
        if len(word) > 16:
            continue
        if not word.isalpha():
            continue
        if word in profanities_list:
            continue
        if word in names_list:
            continue
        if word in months_list:
            continue
        if word in days_list:
            continue
        try:
            synset = wordnet.synset("%s.n.01" % word)
        except WordNetError:
            continue
        synsets = wordnet.synsets(word)
        if len(synsets) != 1:
            continue

        definition = synset.definition()
        examples = synset.examples()
        hints = []

        if word not in definition.lower():
            if len(definition) >= 8 and len(definition) <= 128:
                hints.append({"type": "definition", "value": definition})

        if len(examples) > 0 and word in examples[0].lower():
            pattern = re.compile(word, re.IGNORECASE)
            example = pattern.sub("_" * len(word), examples[0])
            if len(example) >= 8 and len(example) <= 128:
                hints.append({"type": "example", "value": example})

        if len(hints) > 0:
            data.append({"word": word, "hints": hints})

    shuffled_data = []
    for chunk in divide_chunks(data, 64):
        random.shuffle(chunk)
        shuffled_data.extend(chunk)

    with open("../src/assets/data.json", "w+", encoding="utf-8") as f:
        f.write(json.dumps(shuffled_data, indent=4, sort_keys=False))

    print("%d words saved." % len(shuffled_data))

if __name__ == "__main__":
    run()
