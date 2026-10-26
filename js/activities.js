function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	const completed = tweet_array.filter(t => t.source === 'completed_event' && t.activityType !== 'unknown');
	const stats = {};
	completed.forEach(t => {
		const type = t.activityType; 
		if (!stats[type]){
			stats[type] = {count: 0, total: 0, weekdayTotal: 0, weekdayCount: 0, weekendTotal: 0, weekendCount: 0};
		}
		const s = stats[type];
		s.count++;
		s.total += t.distance;

		const day = t.time.getDay();
		if (day === 0 || day === 6){
			s.weekendTotal += t.distance;
			s.weekendCount++;
		}
		else{
			s.weekdayTotal += t.distance;
			s.weekdayCount++;
		}
	});
	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.
	const sortedTypes = Object.keys(stats).sort((a,b)=> stats[b].count - stats[a].count);

	const topThree = sortedTypes.slice(0,3);
	document.getElementById('numberActivities').innerText = sortedTypes.length;
	document.getElementById('firstMost').innerText = topThree[0];
	document.getElementById('secondMost').innerText = topThree[1];
	document.getElementById('thirdMost').innerText = topThree[2];
	const byAvg = topThree.slice().sort((a, b) => (stats[b].total / stats[b].count) - (stats[a].total / stats[a].count));
	document.getElementById('longestActivityType').innerText = byAvg[0];
	document.getElementById('shortestActivityType').innerText = byAvg[byAvg.length-1];


	let weekdayTotal = 0, weekdayCount = 0, weekendTotal = 0, weekendCount = 0;
	topThree.forEach(type => {
		weekdayTotal += stats[type].weekdayTotal;
		weekdayCount += stats[type].weekdayCount;
		weekendTotal += stats[type].weekendTotal;
		weekendCount += stats[type].weekendCount;

	});
	const weekdayAvg = weekdayTotal / weekdayCount;
	const weekendAvg = weekendTotal / weekendCount; 
	document.getElementById('weekdayOrWeekendLonger').innerText = weekendAvg > weekdayAvg ? 'weekends' : 'weekdays';
	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
	    "values": tweet_array
	  }
	  //TODO: Add mark and encoding
	};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});