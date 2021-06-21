  
function initialize_page() {
    var dropdown = d3.select("#selDataset");

    d3.json("Data/samples.json").then((data)=> {
        console.log(data)
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });
    });
}

init();