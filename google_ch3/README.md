Chapter 3 - Google maps and jQuery
---

###Project info
For the purposes of this project, we'll have a scenario where we need to build a map-based application for a company that takes things from one place to another. They want a page that their customers can visit to calculate the cost of, and maybe order, the transport of something from one place to another by clicking on different areas of a localized map.

We'll see how to listen for clicks on the map so that markers can be added and the precise locations of each marker can be recorded. We can then update the UI to show the actual street addresses of the locations that were clicked and allow the visitor to generate a quote based on the computed distance between the two addresses.

###What is done
* Creating the page and interface
* Initializing the map
* Showing the company HQ with a custom overlay
* Capturing clicks on the map
* Updating the UI with the start and end locations
* Handling marker repositions
* Factoring in weights
* Displaying the projected distance and cost
