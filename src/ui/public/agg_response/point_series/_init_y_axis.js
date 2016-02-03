var Notifier = require('ui/notify/notifier');
var notify = new Notifier({
  location: 'Axis'
});

define(function (require) {
  return function PointSeriesInitYAxis() {
    var _ = require('lodash');

    return function initYAxis(chart) {
      var y = chart.aspects.y;
      var x = chart.aspects.x;

      if (_.isArray(y)) {
        // TODO: vis option should allow choosing this format
        chart.yAxisFormatter = y[0].agg.fieldFormatter();
        chart.yAxisLabel = 'y axis if'; // use the legend

      } else {
        chart.yAxisFormatter = y.agg.fieldFormatter();
        notify.log('y.col.title', y.col.title === 'Average point_percentage');
        switch (y.col.title) {
          case 'Average point_percentage':
            chart.yAxisLabel = 'point percentage';
            break;
          case 'Sum of form_point':
            chart.yAxisLabel = 'missed point';
            break;
          default:
            chart.yAxisLabel = y.col.title;
        }
      }

      var xAggOutput = x.agg.write();
      chart.yScale = xAggOutput.metricScale || null;
    };
  };
});
