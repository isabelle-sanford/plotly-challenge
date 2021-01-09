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


  var myID = "940"; 
  // filter data to get only right name
  var currdata = sample.filter(s => s.id === myID);

  // console.log(currdata[0]);

  var myOTUs = currdata[0]["otu_ids"];
  var myCounts = currdata[0]["sample_values"];

  // // sort by # of things and get top 10
  // var sortedD = currdata.sort((a,b) => {
  //     b.sample_values - a.sample_values;
  // });

  // console.log(sortedD)

  // var slicedD = sortedD.slice(0,10);
  // var reversedD = slicedD.reverse();

  drawHPlot(myCounts, myOTUs, "sample-metadata");


});



