
var width = 550;
var height = 500;
var padding = 50;

var iterate = 0;

var main = d3.select('#wrapper')
				.append('svg')
				.attr('id', 'main')
				.attr('height', height)
				.attr('width', width)
				.append('g');

var xScale = d3.scale.linear().range([0, width-50]);
var yScale = d3.scale.linear().range([300, 0])

var xAxis = d3.svg.axis().scale(xScale)
						.orient('bottom')
						.ticks(10);

var yAxis = d3.svg.axis().scale(yScale)
							.orient('left')
							.ticks(5);

d3.csv('util.csv', function(data) {

	var xMax = d3.max(data, function(el) {
		return parseInt(el.GAS_COST);
	});
	var xMin = d3.min(data, function(el) {
		return parseInt(el.GAS_COST);
	});

	var xDomain = d3.extent(data, function(el) {
		return parseInt(el.GAS_COST);
	});
	var yDomain = d3.extent(data, function(el) {
		return el.MONTH;
	});

	xScale.domain([0, xMax]);
	yScale.domain(yDomain);

	main.append('g')
		.attr('class', 'x axis')
		.attr('transform', 'translate('+ padding + ',300)')
		.call(xAxis);

	// main.append('g')
	// 	.attr('class', 'y axis')
	// 	.attr('transform', 'translate(50)')
	// 	.call(yAxis);

	var bars = main.selectAll('rect')
				.data(data)
				.enter()
				.append('g')
				.attr('class', 'info')
				.append('rect');

	bars.attr('width', function(d) {
		console.log(xScale(d.GAS_COST))
		return xScale(d.GAS_COST);
	})
		.attr('height', 40);


	bars.attr('x', padding)
		.attr('y', function(d) {
			iterate += 75;
			return iterate;

		});

	bars.on('mouseenter', function(d, i) {
		bar = d3.select(this)
				.transition()
				.attr('height', 45)
				.duration(300);
	});

	bars.on('mouseleave', function(d, i) {
		bar = d3.select(this)
				.transition()
				.attr('height', 40)
				.duration(300);
	});



	bars.attr('fill', function(d) {
		if (d.MONTH == 'January') {
			return '#D44646';
		} else if (d.MONTH == 'February') {
			return '#46A5D4';
		} else if (d.MONTH == 'March') {
			return '#46D4A1';
		} else {
			return 'red';
		}
	}).attr('stroke', 'none');

});