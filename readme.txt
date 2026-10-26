--Readme document for *KAYLA ZHANG*, *kaylaz2@uci.edu*--

1. How many assignment points do you believe you completed (replace the *'s with your numbers)?

10/10
- 3/3 Summarizing tweets
- 4/4 Identifying the most popular activities
- 3/3 Adding a text search interface

* I added a bonus feature for the dynamically changing chart. 
Instead of switching between two charts, the distance chart on the activiites page is one Vega-lite chart
that changes when "show means" button is pressed.

- The chart has a param called "showMeans".
- A joinaggreagregate transform adds mean distance for each activity onto each day of the week to the data ponts. 
- A calcualte transform picks which value each point is draw, either the actual distance or activity or day mean. 
- The aggregate button flips showMeans and re reuns the chart, so the same chart is showing. The Y-axis rescales.

Since the means is the same chart, I left the #distanceVisAggregated empy.

2. How long, in hours, did it take you to complete this assignment?
12 hrs 


3. What online resources did you consult when completing this assignment? (list sites like StackOverflow or specific URLs for tutorials; describe queries to Generative AI or use of AI-based code completion)

https://vega.github.io/vega-lite/docs/encoding.html
https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
https://vega.github.io/vega-lite/docs/parameter.html 
https://vega.github.io/vega-lite/tutorials/streaming.html 
https://stackoverflow.com/questions/23571013/how-to-remove-url-from-a-string-completely-in-javascript 


4. What classmates or other individuals did you consult as part of this assignment? What did you discuss?
n/a 


5. Is there anything special we need to know in order to run your code?

no 