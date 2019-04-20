<h1>Dealing with Deep Nested Code</h1>
<br/>
<p>
	Throughout our programming career, we will encounter
	complex conditional business logic and it may appear to be 
	no other way but to write a bunch of nested if-else 
	or switch statements. These code will look complex, but
	sometimes all we need to do is some re-organize and
	re-structure the code. Here I will go over a technique I use 
	frequently to address deep nesting, but first let's go 
	over an example of what deep nesting is:
</p>

```javascript
const functionWithDeepNesting = (flag, objectName) => {

	if (flag == true) {
		obj = dependency.getObjectForWork(objectName);
		if (obj != null) {
			let stats = doWorkWithObject(obj);
			if (stats != null) {

				let success = processStats(stats);

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
```
<p>
	As you can see here there's 4 level of nesting here and
	would look even more complicated if the actual logic isn't 
	abstracted out with the given functions above. Imagine each 
	of the functions above were actually 10-20 lines of code. This
	can easily be a 100 line of code. Before we continue, take a moment
	and see if you can re-write this code to avoid the nesting
</p>
<h3>Use Guard Clauses</h3>
<p>
	Guard clauses are conditional loops that filters out
	invalid conditions and will return out from the function.
	They're often used to check if a value is NULL, in range,
	or meets a certain criteria. Simply put, they guard your
	functions from invalid values.
</p>

```javascript
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
```

<p>
    As you can see the second function is much easier to
    read and comprehend for two primary reason: <br />
    <br />
    1. The primary logic is not nested at all <br />
    2. You do not have to look further than the return statement <br />
    <br />
    In this example the logic is very short and simple, but
    if you imagine more sophisticated examples, you would have to
    deal with 1+ nesting and scrolling further down to see if there's
    additional logic.
</p>

```javascript
const functionWithDeepNestedConditions = (flag, obj) => {

	if (flag == true) {
		if (obj != null) {
			doWorkWithObject(obj):
		}
	}

	doUnrelatedWork();
}

const functionThatWontWorkWithGuardClauses = (flag, obj) => {

	if (flag == false) {
		return;
	}

	if (object == null) {
		return;
	}

	doWorkWithObject(obj);
	doUnrelatedWork();
}
```

<p>
    However, there's a caveat with using guard clauses. The two
    functions above are not equivalent. If flag is false,
    Function #1 will perform doUnrelatedWork(), while Function #2
    will simply return out of the statement. Ideally, doUnrelatedWork()
    should not be inside the function and should be in the calling function.
    So to use guard clauses, you would have to decompose large functions into
    smaller ones.
</p>
<h3>Decompose into functions</h3>

```javascript
const functionThatDoesUnrelatedWork = (flag, obj) => {

	if (flag == true) {
		obj = dependency.getObjectForWork();
		firstLevelNestingWork(obj);
	}

	doUnrelatedWork(); // Function's Primary Logic
}

const firstLevelNestingWork = (obj) => {

	if (obj == null) {
		return;
	}

	let stats = doWorkWithObject(obj); // Function's Primary Logic
	secondLevelNestingWork(stats);

}

const secondLevelNestingWork = (stats) => {

	if (stats != null) {
		// Function Primary Logic
		let success = processStats(stats);

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
```

<p>
	You can almost keep everything to a nesting of one level,
	if you decompose everything into a routine. Take special notice,
	that each routine that is decomposed has a piece of logic that is
	specific to its level. A simple way to find out if you're abusing
	this method is if you have trouble naming the function. If you do,
	then the logic within the function does not justify creating 
	another method. All you are doing is hiding nesting (complexity), by
	creating another method. Creating another method is complexity in
	itself. So, at the end of the day you're disguising the complexity itself.
</p>

```javascript
const functionWithBreakBlock = (flag, obj) => {

	do {

		if (flag == false || obj == null) {
			break;
		}

		doWorkWithObject(obj);

	} while (false);

	doRelatedWork(obj);
}
```

<p>
	There are some very rare cases, where I find some logic fits
		better under the same functions. In this case, we can use a
		break-block. This should only be used, if the level of nesting
		is getting dangerous and there's no other way around it. Document heavily.
</p>
<h3>Conclusion</h3>

```javascript
const primaryFunction = (flag, obj) => {
	
	doComplexConditionalWork(flag, objectName);
	doUnrelatedWork();
}

const doComplexConditionalWork = (flag, objectName) => {

	if (flag == false) {
		return;
	}

	let obj = dependency.getObjectForWork(objectName);
	let stats = doWorkWithObject(obj);
	let success = processStats(stats);
	processResultFromStats(success);
}

const doWorkWithObject = (obj) => {

	if (object == null) {
		return;
	}

	// TODO - processObject logic here

	return obj;
}

const processStats = (stats) => {

	if (stats == null) {
		console.log('Failed! No work stats from object');
		return null;
	}

	// TODO - processStats logic here

	return stats;
}

const processResultFromStats = (success) => {

	if (success) {
		console.log('Work stats persisted in database successfully');
	} else {
		console.log('Work stats not persisted in database, defaulting to log file');
		writeStatsToFile(stats);
	}
}
```

<p>
	Here's the revised version of the code above. At most,
	there is 1 level of nesting compare to the 4 in the previous version.
	Logic are broken down to their own functions and can be re-used
	elsewhere, if needed. Lastly, I must caution the over-use of these
	methods. There's no need to use guard functions if it's more than
	2-3 lines of code. There's no need to create methods to disguise complexity
	for another form of complexity. Finally, if the logic makes sense
	inside one function then keep it in the same function. However, I hope 
	you will consider some of these techinques when nesting is getting out of hand.
</p>
