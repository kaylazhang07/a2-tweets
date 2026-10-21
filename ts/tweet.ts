class Tweet {
	private text:string;
	time:Date;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {
        //TODO: identify whether the source is a live event, an achievement, a completed event, or miscellaneous.
        const text = this.text.toLowerCase();

        if(
            text.indexOf('started') !== -1 ||
            text.indexOf('live event') !== -1 ||
            text.indexOf('currently running') !== -1
        ){
            return 'live_event';
        }

        if (
            text.indexOf('achievement') !== -1 ||
            text.indexOf('personal best') !== -1 ||
            text.indexOf('goal reached') !== -1 ||
            text.indexOf('milestone') !== -1
        ){
            return 'achievement';
        }

        if (
            text.indexOf('completed') !== -1 ||
            text.indexOf('just posted') !== -1 ||
            text.indexOf('finished') !== -1
        ){
            return 'completed_event';
        }

        return 'miscellaneous';


}

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        //TODO: identify whether the tweet is written
        return false;
    }

    get writtenText():string {
        if(!this.written) {
            return "";
        }
        //TODO: parse the written text from the tweet
        return "";
    }

    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        //TODO: parse the activity type from the text of the tweet
        return "";
    }

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }
        //TODO: prase the distance from the text of the tweet
        return 0;
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    }
}