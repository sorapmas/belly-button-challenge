// reading in samples.json files from URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json."

// fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);
  });