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

            visitedArray.push(toVisitArray.shift());
            // TO DELETE ---- ONLY FOR DEBUG
            console.log(visitedArray);
            console.log(errorCounter);
            console.log(successCounter);
            if (nextUrl) {
                parsePage(nextUrl);
            }
        }, 500);
    }


    function parsePage(url){
        ineed.collect.hyperlinks.from(url,
            function(err,response,result){

                if(errorCounter >= 10 && errorCounter >= successCounter){
                    throw new Error('Too many errors');
                }
                if(err){
                    errorCounter++;
                }else{
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

    function hasBeenVisited(url){
        return visitedArray[url];
    }

};