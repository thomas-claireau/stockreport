export function sum(values) {
	return values.reduce((acc, cur) => acc + cur, 0);
}

export function groupBy(xs, key) {
	return xs.reduce(function (rv, x) {
		(rv[x[key]] = rv[x[key]] || []).push(x);
		return rv;
	}, {});
}
