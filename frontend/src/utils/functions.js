export function sum(values) {
  return values.reduce((acc, cur) => acc + cur, 0);
}

export function groupBy(xs, key) {
  return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
}

export function formatPrice(cent) {
  return {
    euro: Number(cent / 100),
    cent,
  };
}

export function groupByDate(data, scale) {
  return groupBy(
    data
      .map(item => {
        const scaleObj = {};

        if (scale == 'week') {
          scaleObj['day'] = '2-digit';
          scaleObj['month'] = '2-digit';
          scaleObj['year'] = '2-digit';
        } else if (scale == 'month') {
          scaleObj['month'] = '2-digit';
          scaleObj['year'] = '2-digit';
        } else {
          scaleObj['year'] = 'numeric';
        }

        return {
          ...item,
          date: new Date(item.updatedAt).toLocaleString('default', scaleObj),
        };
      })
      .reverse(),
    'date',
  );
}
