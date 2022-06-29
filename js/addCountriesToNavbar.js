function populateSidebar(){
    createCountriesNavbar();
    createLeaguesNavbar(); //addLeaguesToNavbar.js
}

function updateCountriesNavbar(inputText){
    if(inputText==""){createCountriesNavbar();return;}
    $.getJSON("../json/allCountries.json",function(json){
        var countries = json.response;
        var chosenCountries = [];
        for(let i=0;i<countries.length;i++){
            if((countries[i].name.toLowerCase()).includes(inputText.toLowerCase())){
                chosenCountries.push({"name":countries[i].name,
                                      "flag":countries[i].flag});
                if(chosenCountries.length > 12){break;}
            }
        }
        updateNavbar(chosenCountries);
    });
}

function createCountriesNavbar(){
    d3.select("#countriesNav").html("");
    var popularCountries = [{"name":"England","flag":"https://media.api-sports.io/flags/gb.svg"},
                            {"name":"Spain","flag":"https://media.api-sports.io/flags/es.svg"},
                            {"name":"Italy","flag":"https://media.api-sports.io/flags/it.svg"},
                            {"name":"Germany","flag":"https://media.api-sports.io/flags/de.svg"},
                            {"name":"France","flag":"https://media.api-sports.io/flags/fr.svg"},
                            {"name":"Portugal","flag":"https://media.api-sports.io/flags/pt.svg"},
                            {"name":"Netherlands","flag":"https://media.api-sports.io/flags/nl.svg"},
                            {"name":"Croatia","flag":"https://media.api-sports.io/flags/hr.svg"}];

    var countriesLists = d3.select("#countriesNav")
        .selectAll("li")
        .data(popularCountries)
        .enter()
        .append("li")
        .style("clear","both");

    countriesLists.append("img")
        .attr("src",function(d){return d.flag;})
        .attr("alt","no_image")
        .attr("width","30px")
        .attr("height","30px")
        .attr("class","rounded-circle m-1")
        .style("float","left");
        
    countriesLists.append("p")
        .attr("class","text-white h6 pt-1 ps-2")
        .style("float","left")
        .html(function(d){return d.name;});
}

function updateNavbar(chosenCountries){
    d3.select("#countriesNav").html("");

    var countriesLists = d3.select("#countriesNav")
        .selectAll("li")
        .data(chosenCountries)
        .enter()
        .append("li")
         .style("clear","both");

    countriesLists.append("img")
        .attr("src",function(d){return d.flag;})
        .attr("alt","no_image")
        .attr("width","30px")
        .attr("height","30px")
        .attr("class","rounded-circle")
        .style("float","left");
        
    countriesLists.append("p")
        .attr("class","text-white h6 pt-1 ps-2")
        .style("float","left")
        .html(function(d){return d.name;});
    
}

