import requests
import json


with open('data/samples.json') as s:
  samples = json.load(s)



print(samples[0]['samples'])