// user-written tweets
let writtenTweets = [];

function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	
	writtenTweets = runkeeper_tweets.map(tweet => new Tweet(tweet.text, tweet.created_at)).filter(t => t.written);

}

function addEventHandlerForSearch() {
	
	const searchInput = document.getElementById('textFilter');
	const searchCount = document.getElementById('searchCount');
	const searchText = document.getElementById('searchText');
	const table = document.getElementById('tweetTable');

	searchCount.innerText = 0;
	searchText.innerText = '';

	// reruns search after a character is typed or deleted
	searchInput.addEventListener('input', function() {
		const query = searchInput.value;
		searchText.innerText = query;

		// if search is empty, clear the table and reset count
		if (query === '') {
			searchCount.innerText = 0;
			table.innerHTML = '';
			return;

		}
		// use toLowerCase for case-insensitive matches
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