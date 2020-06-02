var chart;
var period = 5;
var setInter = '';
var TypeLine = 'candlestick';
var end = (new Date()).getTime() + 100000;

var Priceline = {
	color: '#FF0000',
	width: 2,
	value: 0.4,
	dashStyle: 'longdashdot',
	label: {
		text: '<div class="price">5</div>', // Content of the label.
		align: 'right', // Positioning of the label.
	}
};

var stepExpiration = 10000;
var stepLine = 5000;
var tiemExp = (new Date()).getTime() + stepExpiration;
var minRange = 1000;


var typesLine = ['line', 'candlestick'];

var AllData = {
	line: [],
	candlestick: []
};

var options = {
	// ignoreHiddenSeries: true,
	exporting: {
		enabled: false,
		buttons: {
			customButton: {
				x: -62,
				onclick: function () {
					alert('Clicked');
				},
				symbol: 'circle'
			}
		}
	},


	/* mapNavigation: {
	 enableMouseWheelZoom: true
	 },*/
	chart: {
		type: 'line', //делает его овальным
		panning: true,
		animation: Highcharts.svg, // don't animate in old IE
		marginRight: 10,
		events: {
			load: function () {

				// set up the updating of the chart each second
				var series = this.series[0],
					len = series.data.length;

				console.log('data');

				this.addSeries({
					id: 'end point',
					type: 'scatter',
					marker: {
						enabled: true,
						symbol: 'circle',
						radius: 4,
						fillColor: 'white',
						lineColor: 'black',
						lineWidth: 2
					},
					data: [[
						series.data[len - 1].x,
						series.data[len - 1].y
					]]
				});

				var series2 = this.get('end point');
				var yAxis = this.yAxis[0];
				var xAxis = this.xAxis[0];
				chart = this;
			}
		}
	},
	
	title: { text: 'Live random data' },
	xAxis: {
		type: 'datetime',
		tickPixelInterval: 150,
		maxPadding: 1.5,
		max: end,
		//plotLines: [ExpLine, BeforeExpLine]
	},
	
	yAxis: [{
		lineWidth: 1, 
		opposite: true, 
		labels: {  align: 'right',  x: 0  },
		plotLines: [Priceline],
	}],
	
	tooltip: {
		formatter: function () {
			return '<b>' + this.series.name + '</b><br/>' +
				Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
				Highcharts.numberFormat(this.y, 2);
		}
	},
	legend: { enabled: false },
	plotOptions: {
		candlestick: {
			lineColor: '#2f7ed8',
			upLineColor: 'silver', // docs
			upColor: 'blue'
		}
	},
	
	
	series: [
		{
			name: 'Random data',
			type: 'line',
			enableMouseTracking: false,
			marker: { enabled: false },
			data: (function () {

				var data = [], time = (new Date()).getTime(), i;
				
				for (i = -1; i <= 0; i++) 
					data.push( { x: time + i * 1000, y: Math.random(), });

				return data;
			})(),
			visible: true
		},
		{

			name: 'Random data',
			type: 'candlestick',
			enableMouseTracking: false,
			marker: { enabled: false },
			pointWidth: 10,
			data: (function () {
				var data = [], time = (new Date()).getTime(), i;
				for (i = -1; i <= 0; i++) {

					data.push(
						{
							x: time + i * 1000,
							open: Math.random(), 
							high: Math.random() - 0.2,
							low: Math.random() + 0.4,
							close: Math.random() + 0.4
						});
				}

				return data;
			})(),
			visible: false
		},
		{
			name: 'Random data',
			type: 'candlestick',
			enableMouseTracking: false,
			marker: { enabled: false },
			dataGrouping: {
				enabled: true,
				force: true,
				units: [['minute', [1]]]
			},
			pointWidth: 10,
			data: (function () {
				var data = [], time = (new Date()).getTime(), i;
				
				for (i = -1; i <= 0; i += 5) {
					data.push(
						{
							x: time + i * 1000,
							open: Math.random(), //open
							high: Math.random() - 0.2,//high
							low: Math.random() + 0.4,//low
							close: Math.random() + 0.4//close
						});
				}

				return data;
			})(),
			visible: false
		}
	]
};



$(function () {
	$(document).ready(function () {

		Highcharts.setOptions({
			global: { useUTC: false }
		});

		$('#chartdiv').highcharts(options);


		$('#typeLine').click(function () {
			hideSeries();
			chart.series[1].setVisible(true, false);
			minRange = 1000;
			if (minRange) {
				xAxis = chart.xAxis[0];
				xAxis.update({ minRange: minRange });
			}

		});

		chart.series[1].setVisible(true, false);
		$('#period1').click(function () {
			hideSeries();
			chart.series[1].setVisible(true, false);
			minRange = 1000;
			if (minRange) {
				xAxis = chart.xAxis[0];
				xAxis.update({ minRange: minRange });
			}
		});
		
		var lastX;
		var mouseDown;

		$('#chartdiv').mousedown(function () { mouseDown = 1; });
		$('#chartdiv').mouseup(function () { mouseDown = 0; });

		$('#chartdiv').mousemove(function (e) {
			if (chart !== undefined) {
				if (mouseDown == 1) {
					if (e.pageX > lastX) {
						var diff = (e.pageX - lastX) * 20;
						var xExtremes = chart.xAxis[0].getExtremes();
						chart.xAxis[0].setExtremes(xExtremes.min - diff, xExtremes.max - diff);
					}
					else if (e.pageX < lastX) {
						var diff = (lastX - e.pageX) * 20;
						var xExtremes = chart.xAxis[0].getExtremes();
						chart.xAxis[0].setExtremes(xExtremes.min + diff, xExtremes.max + diff);
					}
				}
				lastX = e.pageX;
			}
		});

		$('#chartdiv').on('mousewheel', function (event) {
			var xAxisExtremes = chart.xAxis[0].getExtremes();
			var diff = 2000;
			
			if (event.originalEvent.wheelDelta >= 0) {
				//mouse up
				//move to left
				chart.xAxis[0].setExtremes(xAxisExtremes.min - diff, xAxisExtremes.max - diff);
			}
			else {
				//mouse down
				//move to right
				chart.xAxis[0].setExtremes(xAxisExtremes.min + diff, xAxisExtremes.max + diff);
			}
			lastX = event.pageX;
		});
	});
});

function getTypeLine(x, y, high, low, close) {
	var res = {};
	if (TypeLine == 'line') 
		res = { x: x, y: y }
	else 
		res = { x: x, open: y, high: high, low: low, close: close }
	return res;
}

function setData(series, x, y, high, low, close, period, type) {
	var temp = series.data.slice(-1)[0];
	x = temp.x;

	if ((period * 1000) <= (new Date()).getTime() - x) {
		x = (new Date()).getTime();
		series.addPoint({ x: x, y: y, high: high, low: low, close: close, }, true, false, true);
	} else {
		newValue = [x, y, high, low, close  ];
		temp.update(newValue, true);
		series.chart.redraw(false);
	}
}


function hideSeries() {
	for (i = 0; i <= chart.series.length; i++) {
		if (typeof chart.series[i] != 'undefined') {
			chart.series[i].setVisible(false, false);
		}
	}
}

function getTime(x) { 
	x = x.toString().substr(0, 10);
	x = x + '000';
	x = parseInt(x);
	return x;
}


function updateData(Open, Close, High, Low, Timestamp) {
	var series = options.series[0],
		len = series.data.length;

	var x = (new Date(Timestamp)).getTime();
	var yAxis = chart.yAxis[0];
	var xAxis = chart.xAxis[0];

	chart.series[1].addPoint([x, Open, High, Low, Close], true, false);
	//options.series[1].addPoint({ x: x, y: Open }, true, false);
	

	if (true) {
		getTime(x, 5);
	}

	if (true) {
		plotBand = yAxis.plotLinesAndBands[0];
		$.extend(plotBand.options, {
			value: Open,
			label: {
				text: '<div class="price">' + Open + '</div>',
				align: 'right'
			}
		});

		//plotBand.render();
		yAxis.update({
			plotLines: [
				Object.assign({}, plotBand.options,
					{
						label: {
							text: '<div class="price">' + Open + '</div>',
							align: 'right'
						}
					}
				)
			]
		});
	}

	var max = (new Date()).getTime() + 50000;
	var min = (new Date()).getTime() - 30000;
	var t = false;

	if ((xAxis.max - tiemExp) < 1000) {
		t = true;
		var max = (new Date()).getTime() + 90000;
		var min = (new Date()).getTime() - 20000;
	}

	if (tiemExp <= x || t) {
		tiemExp = (new Date()).getTime() + stepExpiration;
		var xAxisExtremes = chart.xAxis[0].getExtremes();
		chart.xAxis[0].setExtremes((new Date()).getTime() - 20000, (new Date()).getTime() + 20000);

		xAxis.update({
			type: 'datetime',
			max: max,
			min: min,
			plotLines: []
		});


		chart.redraw();
	}
}