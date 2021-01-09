// BUILD PLOT function
function drawHPlot(x_value, y_value, div) {
    var trace = {
      x: x_value,
      y: y_value,
      type: 'bar',
      orientation: 'h'
    };
    
    var data_plot = [trace];

    var layout = {
      title: "Top OTU counts"
    };

    Plotly.newPlot(div, data_plot, layout);
};


// read in samples.json with d3
// unpack function
// function unpack(rows, index) {
//     return rows.map(function(row) {
//       return row[index];
//     });
// };




d3.json('https://isabelle-sanford.github.io/plotly-challenge/plotly-challenge/data/samples.json').then(function(data) { // maybe change later

  var name = data[0].names;
  var metadata = data[0].metadata;
  var sample = data[0].samples;

  // var id = unpack(data.metadata, 0);
  // var eth = unpack(data.metadata, 1);
  // var gender = unpack(data.metadata, 2);
  // var age = unpack(data.metadata, 3);
  // var loc = unpack(data.metadata, 4);
  // var bbtype = unpack(data.metadata, 5);
  // var wfreq = unpack(data.metadata, 6);

  // var otu_ids = unpack(data.samples, 1);
  // var sample_values = unpack(data.samples, 2);
  // var otu_labels = unpack(data.samples, 3);

  var nameDrop = d3.select("#selDataset");
  name.forEach(n => {
    var myName = nameDrop.append("option");
    myName.text(n);
  }); 

  function optionChanged(id) {
    // filter data to get only right name
    var currdata = sample.filter(s => s.id === id);
  
    var myOTUs = currdata[0]["otu_ids"];
    var myCounts = currdata[0]["sample_values"];
  
  
    var zipped = myOTUs.map(function(e, i) {
      return [e, myCounts[i]];
    });
  
    // sort by # of things and get top 10
    var sortedD = zipped.sort((a,b) => {
        b[1] - a[1];
    });
  
    console.log(zipped);
  
    var slicedD = sortedD.slice(0,10);
    var reversedD = slicedD.reverse();
  
    var sortedOTUs = reversedD.map(t => "OTU"+t[0].toString());
    var sortedCounts = reversedD.map(t => t[1]);
  
    console.log(sortedOTUs);
  
    drawHPlot(sortedCounts, sortedOTUs, "bar");
  }



  optionChanged("940");

});



