import requests
import json


with open('samples.json') as s:
  samples = json.load(s)



print(samples.keys)