
    // Set up the dimensions of the plot
    var margin = { top: 20, right: 30, bottom: 60, left: 60 },
        width = 600 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // Create an SVG element
    var svg = d3.select("div#plot")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Load data from CSV file
    d3.csv("/Users/harindermashiana/Documents/coursematerial/EDAV/Assignments/finalproject/collegeSalaries/data/test.csv").then(function(data) {
        // Set up scales
        var xScale = d3.scaleLinear()
            .domain([0, d3.max(data, function (d) { return +d.starting_salary; })])
            .range([0, width]);

        var yScale = d3.scaleLinear()
            .domain([0, d3.max(data, function (d) { return +d.mid_career_salary; })])
            .range([height, 0]);

        // Create axes
        var xAxis = d3.axisBottom(xScale);
        var yAxis = d3.axisLeft(yScale);

        // Append axes to the SVG
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .call(yAxis);

        // Create x-axis label
        svg.append("text")
            .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.top + 20) + ")")
            .style("text-anchor", "middle")
            .text("Starting career salary");

        // Create y-axis label
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Mid career salary");

        // Create dots for each data point
        svg.selectAll(".dot")
            .data(data)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("cx", function (d) { return xScale(+d.starting_salary); })
            .attr("cy", function (d) { return yScale(+d.mid_career_salary); })
            .attr("r", 5) // radius of the circle

            // Add interactivity
            .on("mouseover", function (event, d) {
                // Example: Display tooltip
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html("(" + d.starting_salary + ", " + d.mid_career_salary + ")")
                    .style("left", (event.pageX + 5) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
    });

    // Create a tooltip
    var tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

