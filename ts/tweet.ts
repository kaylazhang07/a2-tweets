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
            text.startsWith('watch my')||
            text.includes('#rklive') ||
            text.includes('@runkeeper live') 
        ){
            return 'live_event';
        }

        if (
            text.startsWith('achieved')||
            text.includes('set a goal')||
            text.includes('personal best') ||
            text.includes('personal record')
        ){
            return 'achievement';
        }

        if (
            text.startsWith('just completed')||
            text.startsWith('just posted') ||
            text.startsWith('completed') ||
            text.includes('just completed') ||
            text.includes('just posted')
        ){
            return 'completed_event';
        }

        return 'miscellaneous';

    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        return this.writtenText.length > 0;
    }

    get writtenText():string {
        

        if (this.source !== 'completed_event'){
            return '';
        }
        const dashIndex = this.text.indexOf(' - ');
        if (dashIndex === -1){
            return '';
        }

        const text = this.text.substring(dashIndex + 3).replace(/https?:\/\/\S+/g, '')
        .replace(/#Runkeeper/gi, '').trim();

        if (text === 'TomTom MySports Watch'){
            return '';
        }
        //TODO: parse the written text from the tweet
        return text;
    }

    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        const match = this.text.match(/(?:completed|posted) an? (\d+(?:\.\d+)?)\s*(km|mi)\s+([a-z ]+?)(?=\s+(?:with\b|-|in\b|@)|\s*[.!@]|\s*$)/i);
        if (!match){
            return "unknown";
        }
        //TODO: parse the activity type from the text of the tweet
        return match[3].trim().toLowerCase();
    }

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }
        //TODO: prase the distance from the text of the tweet
        const match = this.text.match(/(?:completed|posted) an? (\d+(?:\.\d+)?)\s*(km|mi)/i);
        if (!match){
            return 0;
        }
        const value = parseFloat(match[1]);
        return match[2].toLowerCase() === 'km' ? value / 1.609 : value;
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    }
}