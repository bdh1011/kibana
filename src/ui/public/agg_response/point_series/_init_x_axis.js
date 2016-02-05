var Notifier = require('ui/notify/notifier');
var notify = new Notifier({
  location: 'Axis'
});

define(function () {
  return function PointSeriesInitX() {
    return function initXAxis(chart) {
      var x = chart.aspects.x;
      chart.xAxisFormatter = x.agg ? x.agg.fieldFormatter() : String;
      notify.log('x.col.title', x.col.title);
      switch (x.col.title) {
        case 'manager_name.raw':
          chart.xAxisLabel = 'manager';
          break;
        case 'form_description.raw':
          chart.xAxisLabel = 'each form';
          break;
        default:
          chart.xAxisLabel = x.col.title;
      }
      if (x.col.title.indexOf('timestamp') > -1) {
        chart.xAxisLabel = 'Date';
      }

      if (!x.agg || !x.agg.type.ordered) return;

      chart.ordered = {};
      var xAggOutput = x.agg.write();
      if (xAggOutput.params.interval) {
        chart.ordered.interval = xAggOutput.params.interval;
      }
    };
  };
});
