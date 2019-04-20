// Taming Nested If Statements

// Use Guard Clausens

function printNextNode(node) {

	if (node != null) {
		console.log(node.val);
		printNextNode(node.next);
	}

	// Node is null, but is there code further below?

}

function printNextNode(node) {

	if (node == null) {
		return;
	}

	// Let's not look further if node is null

	console.log(node.val);
	printNextNode(node.next);
	
}

/*
	As you can see the second function is much easier to
	read and comprehend for two primary reason:

	1. The primary logic is not nested at all
	2. You do not have to look further than the return statement

	In this example the logic is very short and simple, but
	if you imagine more sophisticated examples, you would have to
	deal with 1+ nesting and scrolling further down to see if there's
	additional logic.

*/

var functionWithDeepNestedConditions = (flag, obj) => {

	if (flag == true) {
		if (obj != null) {
			doWorkWithObject(obj):
		}
	}

	doUnrelatedWork();
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

/*

	However, there's a caveat with using guard clauses. The two
	functions above are not equivalent. If flag is false,
	Function #1 will perform doUnrelatedWork(), while Function #2
	will simply return out of the statement. Ideally, doUnrelatedWork()
	should not be inside the function and should be in the calling function.
	So to use guard clauses, you would have to decompose large functions into
	smaller ones.

*/

var functionWithBreakBlock = (flag, obj) => {

	do {

		if (flag == false) {
			break;
		}

		if (object == null) {
			break;
		}

		doWorkWithObject(obj);

	} while (false);

	doRelatedWork(obj);
}

/*
	There are some very rare cases, where I find some logic fits
	better under the same functions. In this case, we can use a
	break-block. This should only be used, if there's no other way
	and needs to be well documented.

*/



// var functionWithGuardClauses = (flag, obj) => {

// 	if (flag == false) {
// 		return;
// 	}

// 	if (object == null) {
// 		return;
// 	}

// 	doWorkWithObject(obj);
	

// }

// var functionWithDeepNestedConditions = (flag, obj) => {

// 	if (flag == true) {
// 		if (obj != null) {
// 			doWorkWithObject(obj);
// 			doUnrelatedWork();
// 		}
// 	}

// }

// Decompose using routines

/*
	Finally, you can almost keep everything to a nesting of one level,
	if you decompose everything into a routine. Take special notice,
	that each routine that is decomposed has a piece of logic that is
	specific to its level. A simple way to find out if you're abusing
	this method is if you have trouble naming the function. If you do,
	then the logic within the function does not justify creating 
	another method. All you are doing is hiding nesting (complexity), by
	creating another method. Creating another method is complexity in
	itself. So, at the end of the day you're disguising the complexity itself.
*/

var functionWithDeepNesting = (flag, objectName) => {

	if (flag == true) {
		obj = dependency.getObjectForWork(objectName);
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

var functionThatDoesUnrelatedWork = (flag, obj) => {

	if (flag == true) {
		obj = dependency.getObjectForWork();
		firstLevelNestingWork(obj);
	}

	doUnrelatedWork(); // Function's Primary Logic
}

var firstLevelNestingWork = (obj) => {

	if (obj == null) {
		return;
	}

	var stats = doWorkWithObject(obj); // Function's Primary Logic
	secondLevelNestingWork(stats);

}

var secondLevelNestingWork = (stats) => {

	if (stats != null) {
		// Function Primary Logic
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
