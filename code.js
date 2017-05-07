//Make sure json file is loaded properly
if(typeof colleges !== 'object'){
	alert('Oops, the app did not load properly');
}
else{
	console.log("loaded data:");
	console.log(colleges);
}

function findMatches(wordToMatch, list){
	return list.teams.filter(function(college){
		var regex = new RegExp(wordToMatch,'gi');
		return college.city.match(regex) || college.name.match(regex) || college.region.match(regex) || college.state.match(regex)
	});
}

function displayMatches(){
	console.log("dispalyMatches() just ran")
	//Make sure field isn't blank
	if(this.value === ""){
		suggestions.innerHTML="";
		return;
	}
	//Go find the data that matches the search term
	var matchingData = findMatches(this.value,colleges);
	//Map the matching data to the html suggestions
	var regex = new RegExp(this.value, 'gi');
	var querystring = this.value;
	console.log({querystring});
	var html = matchingData.map(function(college){
		var cityName = college.city.replace(regex,`<span class="hl">${querystring}</span>`);
		var collegeName = college.name.replace(regex,`<span class="hl">${querystring}</span>`);
		var regionName = college.region.replace(regex,`<span class="hl">${querystring}</span>`);
		var stateName = college.state.replace(regex,`<span class="hl">${querystring}</span>`);
		
		return 	`
							<li>
									<span class="school">${regionName}  ${collegeName}</span>
									<span class="location">${cityName}, ${stateName}</span>
						</li>
						`;	
	}).join('');
	suggestions.innerHTML = html;
}

// Run the functions everytime the search input changes
const searchinput = document.querySelector('#searchform input.search');
const suggestions = document.querySelector('ul.suggestions');
searchinput.addEventListener('change',displayMatches); //this will listen for changes (copy/paste etc)
searchinput.addEventListener('keyup',displayMatches); //this will listen for key changes