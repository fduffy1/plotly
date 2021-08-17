var bbdata;

// Fetch the JSON data and console log it
d3.json("samples.json").then(function(data) {
  console.log(data);
  bbdata=data;
  var dropdown = d3.select("#selDataset")
  data.names.forEach(n => {
    dropdown.append("option").property("value",n).text(n)
  });
  dropdown.on("change",buildChart)

  buildChart()
})
    
function buildChart(){
  var selid = d3.select("#selDataset").property("value")
  var metaData=bbdata.metadata.filter(m => m.id == selid)[0]
  var table = d3.select("#sample-metadata")
  table.html("")
  Object.entries(metaData).forEach(([k,v])=>{
    table.append("p").html(`<b>${k}</b>: ${v}`)
  })
var sampleData = bbdata.samples.filter(m => m.id == selid)[0]

var barData = [{
  x: sampleData.sample_values.slice(0,10).reverse(),
  y: sampleData.otu_ids.slice(0,10).reverse().map(id=>`otu ${id}`),
  text:sampleData.otu_labels.slice(0,10).reverse(),
  type: "bar",
  orientation: "h"
}];
var barLayout = {
  title:"Top Ten Bacteria"
};
var config = {
  responsive:true
};
Plotly.newPlot("bar",barData,barLayout,config);



  var trace1 = [{
    x: sampleData.otu_ids,
    y: sampleData.sample_values,
    text: sampleData.otu_labels,
    mode: "markers",
    marker: {
      size: sampleData.sample_values,
      color: sampleData.otu_ids, 
      colorscale: "Picnic"
    },
  }];
  var bubbleLayout = [{
    xaxis: 'Bacteria Creatures per Sample',
    height: 600,
    width: 4000,
  }];
  
  Plotly.newPlot("bubble", trace1, bubbleLayout, config);
}
