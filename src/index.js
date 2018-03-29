module.exports = (config) => {
    let ineed = require('ineed');
    let toVisitArray = [];
    let visitedArray = [];
    let errorCounter = 0;
    let successCounter = 0;
    // Initial page parsing
    parsePage(config.baseUrl);
    processArray();



    function processArray() {
        setInterval(function () {
            var nextUrl = toVisitArray[0];
            
            // TO DELETE ---- ONLY FOR DEBUG
            console.log(visitedArray);
            console.log(errorCounter);
            console.log(successCounter);
            if (nextUrl) {
				toVisitArray.shift();
				parsePage(nextUrl);                
            }
        }, 500);
    }


    function parsePage(url){
        ineed.collect.title.hyperlinks.from(url,
            function(err,response,result){

                if(errorCounter >= 10 && errorCounter >= successCounter){
                    throw new Error('Too many errors');
                }
                if(err){
                    errorCounter++;
                }else{
					addVisitedPage(url,result.title);
                    addWithExistenceCheck(result.hyperlinks);
                    successCounter++;
                }
            });
    }

    function addWithExistenceCheck(urls){
        urls.forEach((potentialUrl) => {
            if (!hasBeenVisited(potentialUrl)) {
                toVisitArray.push(potentialUrl.href);
            }
        });
    }
	
	function addVisitedPage(url,title){
		var visited = {
			'url':url
		}
		if(title){
			visited.title = title;
		}
		visitedArray.push(visited);
	}

    function hasBeenVisited(url){
        return visitedArray[url];
    }

};