function genPlots(id) {
    d3.json("data/samples.json").then((data)=> {
        console.log(data)
        //get top 10
        var samples = data.samples.filter(s => s.id.toString() === id)[0];
        console.log(samples);
        var samplevalues = samples.sample_values.slice(0, 10).reverse();
  
        var OTU_top = (samples.otu_ids.slice(0, 10)).reverse();
        
        // get the otu id's to the desired form for the plot
        var OTU_id = OTU_top.map(d => "OTU " + d)
  
        console.log(`OTU IDS: ${OTU_id}`)
        console.log(`samplevalues: ${samplevalues}`)
  
  
    })
}

function getInfo(id) {
    d3.json("data/samples.json").then((data)=> {

        var metadata = data.metadata;
        console.log(metadata)
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
    getInfo(id);
}

function initialize_page() {
    var dropdown = d3.select("#selDataset");

    d3.json("data/samples.json").then((data)=> {
        console.log(data)
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });
        genPlots(data.names[0])
        getInfo(data.names[0])
    });

}

initialize_page();