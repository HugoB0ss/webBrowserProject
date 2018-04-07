module.exports = (config) => {
	let request = require('request');
	let cheerio = require('cheerio');
    let toVisitArray = [];
    let visitedArray = [];
    let errors = 0;
    toVisitArray.push(config.baseUrl);   // Initial page parsing
    processArray();



    function processArray() {

        setInterval(function () {
            let nextUrl = toVisitArray[0];

            if (nextUrl) {
				toVisitArray.shift();
				parsePage2(nextUrl);
            }
        }, 500);
    }

    function parsePage2(url){
        request(url,function(error,response,body){
            if(error){
                errors++;
            }else{
                let $ = cheerio.load(body);
                addVisitedPage(url,$('title').text(),$('meta'));
                $("a[href^='http']").each(function(){
                    addWithExistenceCheck($(this).attr('href'));

                });
            }
        });
    }

    function addWithExistenceCheck(potentialUrl){
        if (!hasBeenVisited(potentialUrl)) {
            toVisitArray.push(potentialUrl);
        }
    }
	
	function addVisitedPage(url,title,metaList){
        let visited = {
			'url':url
		};
		if(title){
			visited.title = title;
		}
		if(metaList){
		    visited.metaList = metaList;
        }
		visitedArray.push(visited);
	}

    function hasBeenVisited(url){
        return visitedArray[url];
    }

};