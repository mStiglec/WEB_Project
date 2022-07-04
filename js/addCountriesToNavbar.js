var countries = [];

function populateSidebar(){
    fetchCountriesFromApi(); // 1 call
    createCountriesNavbar();

    fetchLeaguesFromApi(); //addLeaguesToNavbar.js // call
    createLeaguesNavbar(); //addLeaguesToNavbar.js
}

function fetchCountriesFromApi(){
    const settings = {
        "async": false,
        "crossDomain": true,
        "url": "https://api-football-v1.p.rapidapi.com/v3/countries",
        "method": "GET",
        "headers": {
            "X-RapidAPI-Key": "",
            "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com"
        }
    };
    
    $.ajax(settings).done(function (response) {
        countries = response;
    });
}

function updateCountriesNavbar(inputText){
    if(inputText==""){createCountriesNavbar();return;}
    var chosenCountries = [];
    for(let i=0;i<countries.length;i++){
        if((countries[i].name.toLowerCase()).includes(inputText.toLowerCase())){
            chosenCountries.push({"name":countries[i].name,
                                  "flag":countries[i].flag,
                                  "code":countries[i].code});
            if(chosenCountries.length > 12){break;}
        }
    }
    updateNavbar(chosenCountries);
}

function createCountriesNavbar(){
    d3.select("#countriesNav").html("");
    var popularCountries = [{"name":"England","flag":"https://media.api-sports.io/flags/gb.svg","code":"GB"},
                            {"name":"Spain","flag":"https://media.api-sports.io/flags/es.svg","code":"ES"},
                            {"name":"Italy","flag":"https://media.api-sports.io/flags/it.svg","code":"IT"},
                            {"name":"Germany","flag":"https://media.api-sports.io/flags/de.svg","code":"DE"},
                            {"name":"France","flag":"https://media.api-sports.io/flags/fr.svg","code":"FR"},
                            {"name":"Portugal","flag":"https://media.api-sports.io/flags/pt.svg","code":"PT"},
                            {"name":"Netherlands","flag":"https://media.api-sports.io/flags/nl.svg","code":"NL"},
                            {"name":"Croatia","flag":"https://media.api-sports.io/flags/hr.svg","code":"HR"}];

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
        .style("float","left")
        .on("click",function(d){
            console.log(d.code);
            showTableByCountryCode(d.code);
        });
        
    countriesLists.append("p")
        .attr("class","text-white h6 pt-1 ps-2")
        .style("float","left")
        .html(function(d){return d.name;})
        .on("click",function(d){
            console.log(d.code);
            showTableByCountryCode(d.code);
        });
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
        .style("float","left")
        .on("click",function(d){
            console.log(d.code);
            showTableByCountryCode(d.code);
        });
        
    countriesLists.append("p")
        .attr("class","text-white h6 pt-1 ps-2")
        .style("float","left")
        .html(function(d){return d.name;})
        .on("click",function(d){
            console.log(d.code);
            showTableByCountryCode(d.code);
        });
    
}

