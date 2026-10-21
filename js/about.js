function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	
	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	document.getElementById('numberTweets').innerText = tweet_array.length;	
	const total = tweet_array.length;
	const completed = tweet_array.filter(tweet => tweet.source === 'completed_event');
	const live = tweet_array.filter(tweet => tweet.source === 'live_event');
	const achievements = tweet_array.filter(tweet => tweet.source === 'achievement');
	const miscellaneous = tweet_array.filter(tweet => tweet.source === 'miscellaneous');

	function formatPercentage(count){
		return ((count / total) * 100).toFixed(2) + '%';
	}

	document.querySelector('.completedEvents').innerText = completed.length;
	document.querySelector('.completedEventsPct').innerText = formatPercentage(completed.length);

	document.querySelector('.liveEvents').innerText = live.length;
	document.querySelector('.liveEventsPct').innerText = formatPercentage(live.length);


	document.querySelector('.achievements').innerText = achievements.length;
	document.querySelector('.achievementsPct').innerText = formatPercentage(achievements.length);


	document.querySelector('.miscellaneous').innerText = miscellaneous.length;
	document.querySelector('.miscellaneousPct').innerText = formatPercentage(miscellaneous.length);
	
	const dates = tweet_array.map(function(tweet){
		return tweet.time.getTime();
	});

	

	const earliestTime= Math.min(...dates);
	const latestTime = Math.max(...dates);

	const earliestDate = new Date(earliestTime);
	const latestDate = new Date(latestTime);


	const dateFormat = {
		weekday: 'long',
		month: 'long',
		day: 'numeric',
		year: 'numeric'
	};
	
	document.getElementById('firstDate').innerText = earliestDate.toLocaleDateString('en-US', dateFormat);

	document.getElementById('lastDate').innerText = latestDate.toLocaleDateString('en-US', dateFormat); 
	
	
}	

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});