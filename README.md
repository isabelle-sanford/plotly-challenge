# Plot.ly Homework - Belly Button Biodiversity

![Bacteria by filterforge.com](Images/bacteria.jpg)

This repository contains an interactive dashboard to explore the [Belly Button Biodiversity dataset](http://robdunnlab.com/projects/belly-button-biodiversity/), which catalogs the microbes that colonize human navels. The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

After using D3.js to read in `samples.json`, the script inputs the webpage content to contain the following:

* The metadata, i.e., an individual's demographic information.

![hw](Images/hw03.png)

* A horizontal bar chart with a dropdown menu to display the top 10 OTUs found in the selected individual.

  ![bar Chart](Images/hw01.png)

* A bubble chart that displays each sample.

![Bubble Chart](Images/bubble_chart.png)

* A gauge chart that displays the weekly washing frequency of the individual. 

![Weekly Washing Frequency Gauge](Images/gauge.png)



This script is rerun each time that a new sample is selected. 


The final page looks approximately like the image below, and is deployed on GitHub Pages.  

![hw](Images/hw02.png)



### About the Data

Hulcr, J. et al.(2012) _A Jungle in There: Bacteria in Belly Buttons are Highly Diverse, but Predictable_. Retrieved from: [http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/](http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/)

- - -

This repository was made as part of the USC Viterbi Data Analytics Boot Camp. 
