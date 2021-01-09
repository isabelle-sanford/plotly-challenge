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
function unpack(rows, index) {
    return rows.map(function(row) {
      return row[index];
    });
};

d3.json('../samples.json').then(function(data) {

    var name = data.names;
    var metadata = data.metadata;
    var sample = data.samples;

    var id = unpack(data.metadata, 0);
    var eth = unpack(data.metadata, 1);
    var gender = unpack(data.metadata, 2);
    var age = unpack(data.metadata, 3);
    var loc = unpack(data.metadata, 4);
    var bbtype = unpack(data.metadata, 5);
    var wfreq = unpack(data.metadata, 6);

    var otu_ids = unpack(data.samples, 1);
    var sample_values = unpack(data.samples, 2);
    var otu_labels = unpack(data.samples, 3);

});


var myID = 940;
// filter data to get only right name
var currdata = sample.filter(s => {
        s.id === myID;
    });


// sort by # of things and get top 10
var sortedD = currdata.sort((a,b) => {
    b.sample_values - a.sample_values;
});

var slicedD = sortedD.slice(0,10);
var reversedD = slicedD.reverse();

drawHPlot(reversedD.otu_ids, reversedD.sample_values, "sample-metadata");

