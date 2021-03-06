function genPlots(id) {
    d3.json("data/samples.json").then((data)=> {
        console.log(data)
        //get top 10
        var samples = data.samples.filter(s => s.id.toString() === id)[0];
        // console.log(samples);
        var samplevalues = samples.sample_values.slice(0, 10).reverse();
  
        var OTU_top = (samples.otu_ids.slice(0, 10)).reverse();
        
        // get the otu id's to the desired form for the plot
        var OTU_id = OTU_top.map(d => "OTU " + d)
  
        // console.log(`OTU IDS: ${OTU_id}`)
        // console.log(`samplevalues: ${samplevalues}`)
        var labels = samples.otu_labels.slice(0, 10);
        var trace = {
            x: samplevalues,
            y: OTU_id,
            text: labels,
            type:"bar",
            orientation: "h",
        };

        var data_bar = [trace];
  
        var layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };
  
        Plotly.newPlot("bar", data_bar, layout);

        var trace_bubble = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            },
            text: samples.otu_labels
  
        };
  
        var layout_bubble = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 800
        };

        var data_bubble = [trace_bubble];
  
        // try to render a bubble plot
        Plotly.newPlot("bubble", data_bubble, layout_bubble); 

        // the gauge plot
        var wfreq = data.metadata.filter(s => s.id.toString() === id)[0].wfreq;
        var trace_gauge = {
            domain: { x: [0, 1], y: [0, 1] },
            value: parseFloat(wfreq),
            title: { text: `Weekly Washing Frequency ` },
            type: "indicator",
            
            mode: "gauge+number",
            gauge: { axis: { range: [null, 9] },
                        steps: [
                        { range: [0, 2], color: "red" },
                        { range: [2, 4], color: "orange" },
                        { range: [4, 6], color: "yellow" },
                        { range: [6, 8], color: "lime" },
                        { range: [8, 9], color: "green" },
                    ]}
        }
        var data_gauge = [trace_gauge]
        var layout_gauge = { 
            width: 700, 
            height: 600, 
            margin: { t: 20, b: 40, l:100, r:100 } 
        };
        Plotly.newPlot("gauge", data_gauge, layout_gauge);
    });
}

function getInfo(id) {
    d3.json("data/samples.json").then((data)=> {

        var metadata = data.metadata;
        // console.log(metadata)
        // filter by id
        var result = metadata.filter(meta => meta.id.toString() === id)[0];

        var demographicInfo = d3.select("#sample-metadata");
        
        // refresh demographic panel
        demographicInfo.html("");

        // grab the demographic data
        Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });
    });
} 

function optionChanged(id) {
    genPlots(id);
    getInfo(id);
}

function initialize_page() {
    var dropdown = d3.select("#selDataset");

    d3.json("data/samples.json").then((data)=> {
        // console.log(data)
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });
        genPlots(data.names[0])
        getInfo(data.names[0])
    });

}

initialize_page();