
			//Width and height
			var w = 600;
			var h = 250;

			var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
							11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

			var xScale = d3.scaleBand()
							.domain(d3.range(dataset.length))
							.rangeRound([0, w])
							.paddingInner(0.05);

			var yScale = d3.scaleLinear()
							.domain([0, d3.max(dataset)])
							.range([0, h]);

			//Create SVG element
			var svg = d3.select("body")
						.append("svg")
						.attr("width", w)
						.attr("height", h);

			//Create bars
			svg.selectAll("rect")
			   .data(dataset)
			   .enter()
			   .append("rect")
			   .attr("x", function(d, i) {
			   		return xScale(i);
			   })
			   .attr("y", function(d) {
			   		return h - yScale(d);
			   })
			   .attr("width", xScale.bandwidth())
			   .attr("height", function(d) {
			   		return yScale(d);
			   })
			   .attr("fill", function(d) {
					return "rgb(0, 0, " + Math.round(d * 10) + ")";
			   });

			//Create labels
			svg.selectAll("text")
			   .data(dataset)
			   .enter()
			   .append("text")
			   .text(function(d) {
			   		return d;
			   })
			   .attr("text-anchor", "middle")
			   .attr("x", function(d, i) {
			   		return xScale(i) + xScale.bandwidth() / 2;
			   })
			   .attr("y", function(d) {
			   		return h - yScale(d) + 14;
			   })
			   .attr("font-family", "sans-serif")
			   .attr("font-size", "11px")
			   .attr("fill", "white");


			//On click, update with new data
			d3.select("p")
				.on("click", function() {
					dataset = [];  						 				 		//Initialize empty array
					var pID = d3.select(this).attr("id");
					if (pID == "clickTest") {
						var numValues = dataset.length;						 		//Count original length of dataset
						var maxValue = 100;											//Highest possible new value

						for (var i = 0; i < numValues; i++) {				 		//Loop numValues times
							var newNumber = Math.floor(Math.random() * maxValue);	//New random integer (0-100)
							dataset.push(newNumber);			 			 		//Add new number to array
						}
					}
					//Update scale domain
					//Recalibrate the scale domain, given the new max value in dataset
					yScale.domain([0, d3.max(dataset)]);

					//Update all rects
					svg.selectAll("rect")
					   .data(dataset)
						 .transition()	//smooth transitions
						 .duration(2000)	//transition period
						 .ease(d3.easeLinear)	//ease must before attributes
					   .attr("y", function(d) {
					   		return h - yScale(d);
					   })
					   .attr("height", function(d) {
					   		return yScale(d);
					   })
					   .attr("fill", function(d) {
							return "rgb(0, 0, " + Math.round(d * 10) + ")";
					   });

					//Update all labels
					svg.selectAll("text")
					   .data(dataset)
						 .transition()	//matching the transition for label
						 .duration(2000)	//matching the transition period
						 .ease(d3.easeLinear)
					   .text(function(d) {
					   		return d;
					   })
					   .attr("x", function(d, i) {
					   		return xScale(i) + xScale.bandwidth() / 2;
					   })
					   .attr("y", function(d) {
					   		return h - yScale(d) + 14;
					   });

				});