    // Sample data with categories and values
    let currentData = [
        { category: 'Physician Assistant', value: 74300	 },
        { category: 'Chemical Engineering', value: 63200 },
        { category: 'Computer Engineering', value: 61400 },
        { category: 'Electrical Engineering', value: 60900 },
        { category: 'Mechanical Engineering', value: 57900},
        { category: 'Industrial Engineering', value: 57700 },
        { category: 'Aerospace Engineering', value: 57700 },
        { category: 'Computer Science', value: 55900 },
        { category: 'Nursing', value: 54200 },
        { category: 'Civil Engineering', value: 53900 },
    ];

    // Set up the SVG container
    const svgWidth = 600;
    const svgHeight = 425;
    const margin = { top: 20, right: 20, bottom: 120, left: 120 };

    const svg = d3.select('#plot')
        .append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight);

    // Set up scales
    const xScale = d3.scaleBand()
        .domain(currentData.map(d => d.category))
        .range([margin.left, svgWidth - margin.right])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(currentData, d => d.value)])
        .range([svgHeight - margin.bottom, margin.top]);

    // Create x-axis
    svg.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0, ${svgHeight - margin.bottom})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");

    // Create y-axis
    svg.append('g')
        .attr('class', 'y-axis')
        .attr('transform', `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(yScale));

    var x_label_height = svgHeight - 10
    // X-axis label
    svg.append("text")
        .attr("class", "x-axis-label")
        .attr("transform", `translate(${svgWidth / 2}, ${x_label_height})`)
        .style("text-anchor", "middle")
        .text("Majors").style('font-weight','bold');;

    // Y-axis label
    svg.append("text")
        .attr("class", "y-axis-label")
        .attr("transform", "rotate(-90)")
        .attr("y", 160 - margin.left)
        .attr("x", 50 - (svgHeight / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Starting Median Salary").style('font-weight','bold');;

    // Create bars
    const bars = svg.selectAll('.bar')
        .data(currentData)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => xScale(d.category))
        .attr('y', d => yScale(d.value))
        .attr('width', xScale.bandwidth())
        .attr('height', d => svgHeight - margin.bottom - yScale(d.value))
        .attr('fill', 'steelblue');

    // Optional: Add labels
    svg.selectAll('.bar-label')
        .data(currentData)
        .enter()
        .append('text')
        .attr('class', 'bar-label')
        .text(d => d.value)
        .attr('x', d => xScale(d.category) + xScale.bandwidth() / 2)
        .attr('y', d => yScale(d.value) - 5)
        .attr('text-anchor', 'middle')
        .attr('fill', 'white');

    // Add interactivity - highlight bars on mouseover
    bars.on('mouseover', function () {
        d3.select(this).attr('fill', 'blue');
    })
    .on('mouseout', function () {
        d3.select(this).attr('fill', 'steelblue');
    });

    // Function to update data based on button click
    function updateData(newDataSet) {
        // Sample alternative datasets
        const dataSets = {
            'Starting Career Salary': [
        { category: 'Physician Assistant', value: 74300	 },
        { category: 'Chemical Engineering', value: 63200 },
        { category: 'Computer Engineering', value: 61400 },
        { category: 'Electrical Engineering', value: 60900 },
        { category: 'Mechanical Engineering', value: 57900},
        { category: 'Industrial Engineering', value: 57700 },
        { category: 'Aerospace Engineering', value: 57700 },
        { category: 'Computer Science', value: 55900 },
        { category: 'Nursing', value: 54200 },
        { category: 'Civil Engineering', value: 53900 },
    ],
            'Mid Career Salary': [
                { category: 'Chemical Engineering', value: 107000 },
                { category: 'Computer Engineering', value: 105000 },
                { category: 'Electrical Engineering', value: 103000	 },
                { category: 'Aerospace Engineering', value: 101000 },
                { category: 'Economics', value: 98600 },
                { category: 'Physics', value: 97300 },
                { category: 'Computer Science', value: 95500 },
                { category: 'Industrial Engineering	', value: 94700	 },
                { category: 'Mechanical Engineering', value: 93600 },
                { category: 'Math', value: 92400 }
            ],
            '%change Starting-Mid Career Salary': [
                { category: 'Math', value: 103.5 },
                { category: 'Philosophy', value: 103.5},
                { category: 'International Relations', value: 97.8	 },
                { category: 'Economics', value: 96.8 },
                { category: 'Marketing', value: 95.1 },
                { category: 'Physics', value: 93.4	 },
                { category: 'Political Science', value: 91.7	 },
                { category: 'Chemistry', value: 87.6	 },
                { category: 'Journalism', value: 87.4	 },
                { category: 'Architecture', value: 84.6	 },
            ]
        };
        console.log(dataSets[newDataSet])
        // Update current data and redraw the chart
        currentData = dataSets[newDataSet];
        updateChart(currentData,newDataSet);
    }

    // Function to update the chart with new data
    function updateChart(dataset,name) {
        // Update scales
        xScale.domain(currentData.map(d => d.category));
        yScale.domain([0, d3.max(currentData, d => d.value)]);

        // Update x-axis and y-axis
        svg.select('.x-axis')
            .transition()
            .call(d3.axisBottom(xScale))
            .selectAll("text")
            .attr("transform", "rotate(-45)")
            .style("text-anchor", "end");

        svg.select('.y-axis')
            .transition()
            .call(d3.axisLeft(yScale));
        //yAxisLabel.text(`Values (${dataset})`);
        d3.select(".y-axis-label").text(`${name}`).style('font-weight','bold');
        // Update bars
        svg.selectAll('.bar')
            .data(currentData)
            .transition()
            .attr('x', d => xScale(d.category))
            .attr('y', d => yScale(d.value))
            .attr('width', xScale.bandwidth())
            .attr('height', d => svgHeight - margin.bottom - yScale(d.value));

        // Update labels
        svg.selectAll('.bar-label')
            .data(currentData)
            .transition()
            .text(d => d.value)
            .attr('x', d => xScale(d.category) + xScale.bandwidth() / 2)
            .attr('y', d => yScale(d.value) - 5);
    }
