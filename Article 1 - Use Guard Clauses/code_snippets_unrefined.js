// Taming Nested If Statements

// Use Guard Clauses

function logNextNode(node) {

	if (node != null) {
		console.log(node.val);
		logNextNode(node.next);
	}

}

function logNextNode(node) {

	if (node == null) {
		return;
	}

	console.log(node.val);
	logNextNode(node.next);
	
}

var functionWithDeepNestedConditions = (flag, obj) => {

	if (flag == true) {
		if (obj != null) {
			doWorkWithObject(obj):
		}
	}

	doUnrelatedWork();
}

var functionWithGuardClauses = (flag, obj) => {

	if (flag == false) {
		return;
	}

	if (object == null) {
		return;
	}

	doWorkWithObject(obj);
	

}

var functionThatWontWorkWithGuardClauses = (flag, obj) => {

	if (flag == false) {
		return;
	}

	if (object == null) {
		return;
	}

	doWorkWithObject(obj);
	doUnrelatedWork();
}

var functionWithDeepNestedConditions = (flag, obj) => {

	if (flag == true) {
		if (obj != null) {
			doWorkWithObject(obj);
			doUnrelatedWork();
		}
	}

}

// Decompose using routines

/*
	You can almost keep everything to a nesting of one level,
	if you decompose everything into a routine.
*/

var functionWithDeepNesting = (flag, obj) => {

	if (flag == true) {

		if (obj != null) {

			var stats = doWorkWithObject(obj);

			if (stats != null) {

				var success = processStats(stats);

				if (success) {
					console.log('Work stats persisted in database successfully');
				} else {
					console.log('Work stats not persisted in database, defaulting to log file');
					writeStatsToFile(stats);
				}

			} else {
				console.log('Failed! No work stats from object');
			}

		}

	}

	doUnrelatedWork();

}

var functionWithSmallFunction = (flag, obj) => {

	if (flag == true) {
		firstLevelNestingWork(obj);
	}

	doUnrelatedWork();
}

var firstLevelNestingWork = (obj) => {

	if (obj != null) {
		var stats = doWorkWithObject(obj);
		secondLevelNestingWork(stats);
	}
}

var secondLevelNestingWork = (stats) => {

	if (stats != null) {
		var success = processStats(stats);

		// Can even create a thirdLevelFunctionHere()
		if (success) {
			console.log('Work stats persisted in database successfully');
		} else {
			console.log('Work stats not persisted in database, defaulting to log file');
			// Can be even uglier if handling exceptions here
			writeStatsToFile(stats);
		}

	} else {
		console.log('Failed! No work stats from object');
	}
}

// Now let's do it with Function De-composition and Guard Clauses





// Use a Break Block