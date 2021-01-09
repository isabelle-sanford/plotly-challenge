import requests
import json


with open('StarterCode/samples.json') as s:
  samples = json.load(s)



print(samples['samples'][0])