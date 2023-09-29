// the url with data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// display the default plots
function init() {

    // use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    // fetch the JSON data and console log it
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);

        // an array of id names
        let names = data.names;

        // iterate through the names Array
        names.forEach((name) => {
            // Append each name as an option to the drop down menu
            // This is adding each name to the html file as an option element with value = a name in the names array
            dropdownMenu.append("option").text(name).property("value", name);
        });

        // assign the first name to name variable
        let name = names[0];

        // call the functions to make the demographic panel, bar chart, and bubble chart
        buildMetaData(name);
        barChart(name);
        bubbleChart(name);
        gaugeChart(name);
    });
}

// make the demographics panel
function buildMetaData(selectedValue) {
    // fetch the JSON data and console log it
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);

        // an array of metadata objects
        let metadata = data.metadata;
        
        // Filter data where id = selected value after converting their types 
        // (bc meta.id is in integer format and selectValue from is in string format)
        let filteredData = metadata.filter((meta) => meta.id == selectedValue);
      
        // assign the first object to obj variable
        let obj = filteredData[0]
        
        // clear the child elements in div with id sample-metadata
        d3.select("#sample-metadata").html("");
  
        // object.entries() is a built-in method in JavaScript 
        // this returns an array of a given object's own enumerable property [key, value]
        let entries = Object.entries(obj);
        
        // iterate through the entries array
        // add a h5 child element for each key-value pair to the div with id sample-metadata
        entries.forEach(([key,value]) => {
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });

        // log the entries Array
        console.log(entries);
    });
  }
  

// make the bar chart
function barChart(selectedValue) {
    // fetch the JSON data and console log it
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);

        // an array of sample objects
        let samples = data.samples;

        // filter data where id = selected value 
        let filteredData = samples.filter((sample) => sample.id === selectedValue);

        // assign the first object to obj variable
        let obj = filteredData[0];
        
        // trace for the data for the horizontal bar chart
        let trace = [{
            // slice the top 10 otus
            x: obj.sample_values.slice(0,10).reverse(),
            y: obj.otu_ids.slice(0,10).map((otu_id) => `OTU ${otu_id}`).reverse(),
            text: obj.otu_labels.slice(0,10).reverse(),
            type: "bar",
            marker: {
                color: "emerlad green"
            },
            orientation: "h"
        }];
        
        // use Plotly to plot the data in a bar chart
        Plotly.newPlot("bar", trace);
    });
}
  
// make the bubble chart
function bubbleChart(selectedValue) {
    // fetch the JSON data and console log it
    d3.json(url).then((data) => {

        // an array of sample objects
        let samples = data.samples;
    
        // filter data where id = selected value 
        let filteredData = samples.filter((sample) => sample.id === selectedValue);
    
        // assign the first object to obj variable
        let obj = filteredData[0];
        
        // trace for the data for the bubble chart
        let trace = [{
            x: obj.otu_ids,
            y: obj.sample_values,
            text: obj.otu_labels,
            mode: "markers",
            marker: {
                size: obj.sample_values,
                color: obj.otu_ids,
                colorscale: "Rainbow"
            }
        }];
    
        // apply the x-axis lengend to the layout
        let layout = {
            xaxis: {title: "OTU ID"}
        };
    
        // use Plotly to plot the data in a bubble chart
        Plotly.newPlot("bubble", trace, layout);
    });
}

// make the gauge chart 
function gaugeChart(selectedValue) {
    // fetch the JSON data and console log it 
    d3.json(url).then((data) => {
        // an array of metadata objects
        let metadata = data.metadata;
        
        // filter data where id = selected value after converting their types 
        // (bc meta.id is in integer format and selectValue from is in string format)
        let filteredData = metadata.filter((meta) => meta.id == selectedValue);
      
        // assign the first object to obj variable
        let obj = filteredData[0]

        // trace for the data for the gauge chart
        let trace = [{
            domain: { x: [0, 1], y: [0, 1] },
            value: obj.wfreq,
            title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week", font: {size: 24}},
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: {range: [0,10], tickmode: "linear", tick0: 2, dtick: 2},
                bar: {color: "black"},
                steps: [
                    {range: [0, 1], color: "rgba(255, 255, 255, 0)"},
                    {range: [1, 2], color: "rgba(232, 226, 202, .5)"},
                    {range: [2, 3], color: "rgba(210, 206, 145, .5)"},
                    {range: [3, 4], color:  "rgba(202, 209, 95, .5)"},
                    {range: [4, 5], color:  "rgba(184, 205, 68, .5)"},
                    {range: [5, 6], color: "rgba(170, 202, 42, .5)"},
                    {range: [6, 7], color: "rgba(142, 178, 35 , .5)"},
                    {range: [7, 8], color:  "rgba(110, 154, 22, .5)"},
                    {range: [8, 9], color: "rgba(50, 143, 10, 0.5)"},
                    {range: [9, 10], color: "rgba(14, 127, 0, .5)"}, ]
      
            }
        }];

         // use Plotly to plot the data in a gauge chart
         Plotly.newPlot("gauge", trace);
    });
}

// toggle to new plots when option changed
function optionChanged(selectedValue) {
    buildMetaData(selectedValue);
    barChart(selectedValue);
    bubbleChart(selectedValue);
    gaugeChart(selectedValue)
}

init();