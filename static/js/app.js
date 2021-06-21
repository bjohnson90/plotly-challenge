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
function initialize_page() {
    var dropdown = d3.select("#selDataset");

    d3.json("data/samples.json").then((data)=> {
        console.log(data)
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });
        getInfo(data.names[0])
    });

}

initialize_page();