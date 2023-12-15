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
    const svgWidth1 = 600;
    const svgHeight1 = 425;
    const margin1 = { top: 20, right: 20, bottom: 120, left: 120 };

    const svg1 = d3.select('#plot')
        .append('svg')
        .attr('width', svgWidth1)
        .attr('height', svgHeight1);

    // Set up scales
    const xScale1 = d3.scaleBand()
        .domain(currentData.map(d => d.category))
        .range([margin1.left, svgWidth1 - margin1.right])
        .padding(0.1);

    const yScale1 = d3.scaleLinear()
        .domain([0, d3.max(currentData, d => d.value)*1.2])
        .range([svgHeight1 - margin1.bottom, margin1.top]);

    // Create x-axis
    svg1.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0, ${svgHeight1 - margin1.bottom})`)
        .call(d3.axisBottom(xScale1))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");

    // Create y-axis
    svg1.append('g')
        .attr('class', 'y-axis')
        .attr('transform', `translate(${margin1.left}, 0)`)
        .call(d3.axisLeft(yScale1));

    var x_label_height1 = svgHeight1 - 10
    // X-axis label
    svg1.append("text")
        .attr("class", "x-axis-label")
        .attr("transform", `translate(${svgWidth1 / 2}, ${x_label_height1})`)
        .style("text-anchor", "middle")
        .text("Majors").style('font-weight','bold');;

    // Y-axis label
    svg1.append("text")
        .attr("class", "y-axis-label")
        .attr("transform", "rotate(-90)")
        .attr("y", 160 - margin1.left)
        .attr("x", 50 - (svgHeight1 / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Starting Median Salary").style('font-weight','bold');;

    // Create bars
    const bars1= svg1.selectAll('.bar')
        .data(currentData)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => xScale1(d.category))
        .attr('y', d => yScale1(d.value))
        .attr('width', xScale1.bandwidth())
        .attr('height', d => svgHeight1 - margin1.bottom - yScale1(d.value))
        .attr('fill', 'steelblue');

    // Optional: Add labels
    svg1.selectAll('.bar-label')
        .data(currentData)
        .enter()
        .append('text')
        .attr('class', 'bar-label')
        .text(d => d.value)
        .attr('x', d => xScale1(d.category) + xScale1.bandwidth() / 2)
        .attr('y', d => yScale1(d.value) - 5)
        .attr('text-anchor', 'middle').attr("font-size",8)
        .attr('fill', 'black');

    // Add interactivity - highlight bars on mouseover
    bars1.on('mouseover', function () {
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
        xScale1.domain(currentData.map(d => d.category));
        yScale1.domain([0, d3.max(currentData, d => d.value)*1.2]);

        // Update x-axis and y-axis
        svg1.select('.x-axis')
            .transition()
            .call(d3.axisBottom(xScale1))
            .selectAll("text")
            .attr("transform", "rotate(-45)")
            .style("text-anchor", "end");

        svg1.select('.y-axis')
            .transition()
            .call(d3.axisLeft(yScale1));
        //yAxisLabel.text(`Values (${dataset})`);
        d3.select(".y-axis-label").text(`${name}`).style('font-weight','bold');
        // Update bars
        svg1.selectAll('.bar')
            .data(currentData)
            .transition()
            .attr('x', d => xScale1(d.category))
            .attr('y', d => yScale1(d.value))
            .attr('width', xScale1.bandwidth())
            .attr('height', d => svgHeight1 - margin1.bottom - yScale1(d.value));

        // Update labels
        svg1.selectAll('.bar-label')
            .data(currentData)
            .transition()
            .text(d => d.value)
            .attr('x', d => xScale1(d.category) + xScale1.bandwidth() / 2)
            .attr('y', d => yScale1(d.value) - 5);
    }

    //////////////////////////////

    let currentData_college = [
        { category: 'Darthmouth College', value: 134000	 },
        { category: 'Princeton University', value: 131000 },
        { category: 'Massachusetts Institute of Technology (MIT)', value: 126000 },
        { category: 'Yale University', value: 126000 },
        { category: 'Harvard University', value: 124000},
        { category: 'California Institute of Technology', value: 123000 },
        { category: 'Harvey Mudd College', value: 122000 },
        { category: 'University of Pennsylvania', value: 120000 },
        { category: 'Polytechnic University of New York, Brooklyn', value: 114000 },
        { category: 'Cooper Union', value: 114000 },
    ];
    
     // Set up the SVG container
     const svgWidth = 600;
     const svgHeight = 400;
     const margin = { top: 20, right: 20, bottom: 140, left: 120 };
    
     const svg = d3.select('#plot2')
         .append('svg')
         .attr('width', svgWidth)
         .attr('height', svgHeight);
    
     // Set up scales
     const xScale = d3.scaleBand()
         .domain(currentData_college.map(d => d.category))
         .range([margin.left, svgWidth - margin.right])
         .padding(0.1);
    
     const yScale = d3.scaleLinear()
         .domain([0, d3.max(currentData_college, d => d.value)*1.2])
         .range([svgHeight - margin.bottom, margin.top]);
    
     // Create x-axis
     svg.append('g')
         .attr('class', 'x-axis2')
         .attr('transform', `translate(0, ${svgHeight - margin.bottom})`)
         .call(d3.axisBottom(xScale))
         .selectAll("text").attr("font-size","8")
         .attr("transform", "rotate(-45)")
         .style("text-anchor", "end");
    
     // Create y-axis
     svg.append('g')
         .attr('class', 'y-axis2')
         .attr('transform', `translate(${margin.left}, 0)`)
         .call(d3.axisLeft(yScale));
    
     var x_label_height = svgHeight - 10
     // X-axis label
     svg.append("text")
         .attr("class", "x-axis-label2")
         .attr("transform", `translate(${svgWidth / 2}, ${x_label_height})`)
         .style("text-anchor", "middle")
         .text("School Name").style('font-weight','bold');;
    
     // Y-axis label
     svg.append("text")
         .attr("class", "y-axis-label2")
         .attr("transform", "rotate(-90)")
         .attr("y", 160 - margin.left)
         .attr("x", 50 - (svgHeight / 2))
         .attr("dy", "1em")
         .style("text-anchor", "middle")
         .text("Starting Median Salary").style('font-weight','bold');;
    
     // Create bars
     const bars = svg.selectAll('.bar2')
         .data(currentData_college)
         .enter()
         .append('rect')
         .attr('class', 'bar2')
         .attr('x', d => xScale(d.category))
         .attr('y', d => yScale(d.value))
         .attr('width', xScale.bandwidth())
         .attr('height', d => svgHeight - margin.bottom - yScale(d.value))
         .attr('fill', 'steelblue');
    
     // Optional: Add labels
     svg.selectAll('.bar-label2')
         .data(currentData_college)
         .enter()
         .append('text')
         .attr('class', 'bar-label2')
         .text(d => d.value).attr("font-size","8")
         .attr('x', d => xScale(d.category) + xScale.bandwidth() / 2)
         .attr('y', d => yScale(d.value) - 5)
         .attr('text-anchor', 'middle').attr("font-size",8)
         .attr('fill', 'black');
    
     // Add interactivity - highlight bars on mouseover
     bars.on('mouseover', function () {
         d3.select(this).attr('fill', 'blue');
     })
     .on('mouseout', function () {
         d3.select(this).attr('fill', 'steelblue');
     });
    
     // Function to update data based on button click
     function updateData2(newDataSet) {
         // Sample alternative datasets
         const dataSets = {
             'Top College Northeast': [
        { category: 'Darthmouth College', value: 134000	 },
        { category: 'Princeton University', value: 131000 },
        { category: 'Massachusetts Institute of Technology (MIT)', value: 126000 },
        { category: 'Yale University', value: 126000 },
        { category: 'Harvard University', value: 124000},
        { category: 'California Institute of Technology', value: 123000 },
        { category: 'Harvey Mudd College', value: 122000 },
        { category: 'University of Pennsylvania', value: 120000 },
        { category: 'Polytechnic University of New York, Brooklyn', value: 114000 },
        { category: 'Cooper Union', value: 114000 },
     ],
             'Top Engineering College': [
                 { category: 'Massachusetts Institute of Technology (MIT)', value: 126000 },
                 { category: 'California Institute of Technology', value: 123000 },
                 { category: 'Harvey Mudd College', value:           122000              },
                 { category: 'Polytechnic University of New York, Brooklyn', value: 114000 },
                 { category: 'Cooper Union', value: 114000 },
                 { category: 'Worcester Polytechnic Institute (WPI)', value: 114000 },
                 { category: 'Carnegie Mellon University (CMU)', value: 111000},
                 { category: 'Rensselaer Polytechnic Institute (RPI)', value: 110000 },
                 { category: 'Georgia Institute of Technology', value: 106000 },
                 { category: 'Colorado School of Mines', value: 106000 }
             ]
         };
         console.log(dataSets[newDataSet])
         // Update current data and redraw the chart
         currentData = dataSets[newDataSet];
         updateChart2(currentData,newDataSet);
     }
    
     // Function to update the chart with new data
     function updateChart2(dataset,name) {
         // Update scales
         xScale.domain(currentData.map(d => d.category));
         yScale.domain([0, d3.max(currentData, d => d.value)*1.2]);
    
         // Update x-axis and y-axis
         svg.select('.x-axis2')
             .transition()
             .call(d3.axisBottom(xScale))
             .selectAll("text")
             .attr("transform", "rotate(-45)").attr("font-size","8")
             .style("text-anchor", "end");
    
         svg.select('.y-axis2')
             .transition()
             .call(d3.axisLeft(yScale));
         //yAxisLabel.text(`Values (${dataset})`);
         d3.select(".y-axis-label2").text(`${name}`).style('font-weight','bold');
         // Update bars
         svg.selectAll('.bar2')
             .data(currentData)
             .transition()
             .attr('x', d => xScale(d.category))
             .attr('y', d => yScale(d.value))
             .attr('width', xScale.bandwidth())
             .attr('height', d => svgHeight - margin.bottom - yScale(d.value));
    
         // Update labels
         svg.selectAll('.bar-label2')
             .data(currentData)
             .transition()
             .text(d => d.value)
             .attr('x', d => xScale(d.category) + xScale.bandwidth() / 2)
             .attr('y', d => yScale(d.value) - 5);
     }