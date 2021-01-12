// --------PLOT FUNCTIONS---------------

// horizontal bar chart
function drawHPlot(x_value, y_value, div, labels) {
    let data_plot = [{
      x: x_value,
      y: y_value,
      type: 'bar',
      orientation: 'h',
      text: labels
    }];

    let layout = {
      title: "Most Found OTUs",
      xaxis: {title: "Number of instances of OTU"},
      yaxis: {title: "OTU IDs"}
    };

    Plotly.newPlot(div, data_plot, layout);
};

// bubble plot
function drawBubble(x_value, y_value, div, labels) {
  let data_plot = [{
    x: x_value,
    y: y_value,
    text: labels,
    mode: 'markers',
    marker: {
      size: y_value,
      color: x_value,
      colorscale: 'Jet',
      sizeref: .1,
      sizemode: 'area'
    }
  }];

  let layout = {
    title: "Counts of every OTU",
    xaxis: {title: "OTU ID"},
    yaxis: {title: "Count of OTU"}
  };

  Plotly.newPlot(div, data_plot, layout);
};

// gauge plot
function drawGauge(div, washing) {

  let data = [{
    domain: { x: [0, 1], y: [0, 1] },
    value: washing,
    type: "indicator",
    mode: "gauge+number",
    // number: {suffix: " scrubs/wk"},

    gauge: {
      axis: 
      { range: [0, 9], 
        tickwidth: 1,
        dtick: 1,
        tick0: 0
      },

      bar: {
        color: "blue"
      },

      steps: [
        {range: [0, 1],  color: 'tomato' },
        {range: [1, 2],  color: 'coral' },
        {range: [2, 3],  color: 'lightsalmon' },
        {range: [3, 4],  color: 'blanchedalmond' },
        {range: [4, 5],  color: 'white' },
        {range: [5, 6],  color: 'greenyellow' },
        {range: [6, 7],  color: 'lawngreen' },
        {range: [7, 8],  color: 'limegreen' },
        {range: [8, 9],  color: 'seagreen' },
      ]

      // borderwidth: 3
    }
  }];

  let layout = {
    title: "Belly Button Washing Frequency\n(Scrubs per Week)"
  };

  Plotly.newPlot(div, data, layout);
}


// -------------D3 WORK---------------

// read in samples.json with d3


function optionChanged(id) {

  d3.json('https://isabelle-sanford.github.io/plotly-challenge/data/samples.json').then(function(data) { // maybe change later
    // load dicts
    var name = data[0].names;
    var metadata = data[0].metadata;
    var sample = data[0].samples;

    // populate dropdown with names
    var nameDropdown = d3.select("#selDataset");
    d3.select("#selDataset").selectAll('option').remove();
    name.forEach(n => {
      var myName = nameDropdown.append("option");
      myName.text(n);
    }); 
    nameDropdown.node().value = id;

    // PREP FOR BUBBLE & BAR
    // filter data to get the currently selected ID
    var currdata = sample.filter(s => s.id === id);

    // pull lists out of sample data
    var myOTUs = currdata[0]["otu_ids"];
    var myCounts = currdata[0]["sample_values"];
    var myLabels = currdata[0]["otu_labels"];

    // make bubble chart from above data
    drawBubble(myOTUs, myCounts, "bubble", myLabels);


    // PREP FOR BAR
    // zip lists together
    var zipped = myOTUs.map(function(e, i) {
      return [e, myCounts[i], myLabels[i]];
    });

    // sort by # of things and get top 10
    var sortedData = zipped.sort((a,b) => {
        b[1] - a[1];
    });
    var slicedData = sortedData.slice(0,10);
    var reversedData = slicedData.reverse();

    // get lists ready to go into plotly
    var sortedOTUs = reversedData.map(t => "OTU "+t[0].toString());
    var sortedCounts = reversedData.map(t => t[1]);
    var sortedLabels = reversedData.map(t => t[2]);

    // make hbar chart from sorted data
    drawHPlot(sortedCounts, sortedOTUs, "bar", sortedLabels);

    // TABLE  INSERTION & GAUGE CHART
    // get location & clear previous entries
    var info = d3.select('#sample-metadata');
    d3.select("#sample-metadata").selectAll('p').remove();

    // filter metadata to get the right person
    var myData = metadata.filter(n => n.id === parseInt(id));

    // draw gauge chart using the wfreq variable (washing frequency per week)
    drawGauge('gauge', myData[0].wfreq);

    
    // pull out list of just metadata values
    var vals = Object.values(myData[0]);
    var keys = Object.keys(myData[0])

    // loop through keys list and concat with associated value
    keys.forEach((k, i) => {
      var myInfo = info.append("p");
      myInfo.text(`${k}: ${vals[i]}`);
    });
  });
}


optionChanged("940");




