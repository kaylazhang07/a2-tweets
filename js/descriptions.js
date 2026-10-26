let writtenTweets = [];

function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	//TODO: Filter to just the written tweets
	writtenTweets = runkeeper_tweets.map(tweet => newTweet(tweet.text, tweet.created_at)).filter(t => t.written);

}

function addEventHandlerForSearch() {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
	const searchInput = document.getElementById('textFilter');
	const searchCount = document.getElementById('searchCount');
	const searchText = document.getElementById('searchText');
	const table = document.getElementById('tweetTable');

	searchInput.addEventListener('input', function() {
		const query = searchInput.value;
		searchText.innerText = query;

		if (query === '') {
			searchCount.innerText = 0;
			table.innerHTML = '';
			return;

		}
		const matches = writtenTweets.filter(t => t.writtenText.toLowerCase().includes(query.toLowerCase()));
		searchCount.innerText = matches.length;

		table.innerHTML = matches.map((t, i) => t.getHTMLTableRow(i + 1)).join('');
	});



}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});