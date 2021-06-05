var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;
  
var tooltip = d3.select("body").append("div").attr("class", "toolTip");

var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    y = d3.scaleLinear().rangeRound([height, 0]);
  
var colours = ["#6F257F", "#DA0D59", "orange"];

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("barData.json", function(error, data) {
    if (error) throw error;

    x.domain(data.map(function(d) { return d.area; }));
    y.domain([0, d3.max(data, function(d) { return d.value; })]);

    //g.append("g")
    //    .attr("class", "axis axis--x")
    //    .attr("transform", "translate(0," + height + ")")
    //    .call(d3.axisBottom(x));

    g.append("g")
      	.attr("class", "axis axis--y")
      	.call(d3.axisLeft(y).ticks(5).tickFormat(function(d) { return d + "%"; }).tickSizeInner([-width]))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .attr("fill", "#5D6971")
        .text("Tech sector percentage");

    g.selectAll(".bar")
      	.data(data)
        .enter().append("rect")
        .attr("x", function(d) { return x(d.area); })
        .attr("y", function(d) { return y(d.value); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.value); })
        .attr("fill", function(d, i) { return colours[i % colours.length]; })
        .on("mousemove", function(d){
            tooltip
              .style("left", d3.event.pageX - 50 + "px")
              .style("top", d3.event.pageY - 70 + "px")
              .style("display", "inline-block")
              .html((d.area) + "<br>" + (d.value) + "%");
        })
        .on("mouseout", function(d){ tooltip.style("display", "none");});

    });