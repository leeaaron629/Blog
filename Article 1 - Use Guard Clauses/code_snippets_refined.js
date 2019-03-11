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

	// if (stats != null) {
	// 	var success = processStats(stats);
	// } else {
	// 	console.log('Failed! No work stats from object');
	// }

	let success = processStats(stats);

	// if (success) {
	// 	console.log('Work stats persisted in database successfully');
	// } else {
	// 	console.log('Work stats not persisted in database, defaulting to log file');
	// 	writeStatsToFile(stats);
	// }

	processResultFromStats(success);

}

let processStats = (stats) => {

	if (stats == null) {
		return;
	}

	return success = processStats(stats);
}

let processResultFromStats = (success) => {

	if (success) {
		console.log('Work stats persisted in database successfully');
	} else {
		console.log('Work stats not persisted in database, defaulting to log file');
		writeStatsToFile(stats);
	}

}