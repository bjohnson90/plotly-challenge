  
// Creating function for Data plotting (Bar, gauge, bubble)
function foo() {
    // getting data from the json file
    d3.json("data/samples.json").then((data)=> {
        console.log(data)

    })
}

foo()