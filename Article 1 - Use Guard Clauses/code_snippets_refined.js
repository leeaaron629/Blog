let primaryFunction = (flag, obj) => {
	
	doComplexConditionalWork(flag, obj);
	doUnrelatedWork();

}

let doComplexConditionalWork = (flag, obj) => {

	if (flag == false) {
		return;
	}

	if (obj == null) {
		return;
	}

	let stats = doWorkWithObject(obj);
	let success = processStats(stats);
	processResultFromStats(success);

}

let doWorkWithObject = (obj) => {
	return processObject(obj);
}

let processStats = (stats) => {

	if (stats == null) {
		console.log('Failed! No work stats from object');
		return null;
	}

	return processStats(stats);
}

let processResultFromStats = (success) => {

	if (success) {
		console.log('Work stats persisted in database successfully');
	} else {
		console.log('Work stats not persisted in database, defaulting to log file');
		writeStatsToFile(stats);
	}

}