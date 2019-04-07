// // set the dimensions and margins of the graph
// var margin = { top: 10, right: 10, bottom: 10, left: 10 },
//     width = this.width - 20,
//     height = this.height - 20;
// var colorScheme = ["#E57373","#BA68C8","#7986CB","#A1887F","#90A4AE","#AED581"];
// var color = d3.scaleOrdinal()
//     .domain(['group1','group2','group3','group4','group5','group6'])
//     .range(colorScheme);
//
//
// // append the svg object to the body of the page
// var svg = d3.select('#my_dataviz')
//     .append('svg')
//     .attr('width', width + margin.left + margin.right)
//     .attr('height', height + margin.top + margin.bottom)
//     .append('g')
//     .attr('transform',
//         'translate(' + margin.left + ',' + margin.top + ')');
// var data = this.data;
// var root = d3.hierarchy(data).sum(function (d) {
//   return d.value;
// }); // Here the size of each leave is given in the 'value' field in input data
// // Then d3.treemap computes the position of each element of the hierarchy
// d3.treemap()
//     .size([width, height])
//     .padding(1.5)(root);
//
// // use this information to add rectangles:
// svg
//     .selectAll('rect')
//     .data(root.leaves())
//     .enter()
//     .append('rect')
//     .attr('x', function (d) {
//       return d.x0;
//     })
//     .attr('y', function (d) {
//       return d.y0;
//     })
//     .attr('width', function (d) {
//       return d.x1 - d.x0;
//     })
//     .attr('height', function (d) {
//       return d.y1 - d.y0;
//     })
//     .style('stroke', 'black')
//     .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
//     .attr("fill-opacity", 0.6);
//
// // and to add the text labels
// svg
//     .selectAll('text')
//     .data(root.leaves())
//     .enter()
//     .append('text')
//     .attr('x', function (d) {
//       return d.x0 + 5;
//     })    // +10 to adjust position (more right)
//     .attr('y', function (d) {
//       return d.y0 + 20;
//     })    // +20 to adjust position (lower)
//     .text(function (d) {
//       return d.data.name;
//     })
//     .attr('font-size', '15px')
//     .attr('fill', 'white');



// svg(width="100%" height="100%")
// image(xlink:href="../../public/images/test.jpg"
// :x="(length * n) % width - length" :y="Math.floor((length * n) / width) * length" :width="length" :height="length" opacity="0.8" )(v-for="n in 36000")
