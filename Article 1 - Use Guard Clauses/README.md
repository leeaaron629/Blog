# Dealing with Deep Nested Code (Part 1)

Dealing with deep nested code can be difficult and mentally draining, It is often a major source of code smell in your codebase. If you find it difficult to read, don't worry you're not the only one. Studies have found few people can understand nesting past three levels. (Include Source) Deep nesting results in complex software that is hard to read, maintain, and work on. Everyone should avoid it!

... But it is necessary! Conditions are fundamental tools of programming (Imperative). 

Not, exactly. Complicated code and deep nesting, often, occurs when there is a lack in understanding of the problem.

... No. I understand the problem. There is no other way around it.

Okay, you are right! There are some requirements or problems that that require such complexity. In fact, enterprise applications are littered with deep nested code. However, these are also the projects that requires a programmer's weekend and sanity to develop and maintain. These projects may end up failing as well and no one wants that. Fortunately, programmers have developed techniques to prevent deep nesting and I will be going over some of these techniques with you today.

### Use Guard Clauses

Guard clauses are simple conditionals that filters out
invalid conditions and will return from the function.
They're often used to check if a value is NULL, in range,
or meets a certain criteria. Simply put, they guard your
functions from invalid conditions.

Here's an example of its use:

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

Which one did you like more? Hopefully you prefer the second one
because I did. I prefer the second for 3 primary reasons:  <br />
<br />
1. The primary logic is not nested at all, making it very easy to read. <br />
2. You do not have to look further down than the return statement <br />
3. Clearly shows the author's intentions
<br />
 
For me the no nesting is better to read than any nesting. Since the guard clause clearly shows the function returns when it is NULL, we do not have to consider NULLs when reading further down. While the first function, you're left wondering... "Okay, but what about the NULL case?", while reading the primary logic. Finally, the second one shows clearer intentions. 

For me the first function says: "If node exists, print!"
The second functions says: "Print node!"

However, there's a caveat with using guard clauses. The two
functions below are not equivalent. If complexity is false,
Function #1 will perform doUnrelatedWork(), while Function #2
will simply return out of the statement. Ideally, doUnrelatedWork()
should not be inside, but should be in the calling function.
So to use guard clauses, you would have to decompose large functions into
smaller ones.

```javascript
const functionWithDeepNestedConditions = (obj) => {
		
	complexity = getComplexity(obj);	
		
	if (complexity < SANITY_THRESHOLD) {
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


### Decompose into Functions

You can almost keep everything to a nesting of one level, if you decompose everything into its own function. However, it should not be over-used. A simple rule to follow is, if you trouble naming the new function, then the logic within the function does not justify creating another method. Creating another method is complexity in itself. So, at then dof the day you're disguising the complexity. A well decomposed function will abstract out the complexity and show clearer intentions. Use sparingly!

```javascript
const  = (obj) => {

	complexity = getComplexity(obj)

	if (complexity < SANITY_THRESHOLD) {
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

### Use Break Blocks (Rare)

```javascript
const functionWithBreakBlock = (obj) => {

	complexity = getComplexity(obj);

	do {

		if (complexity < SANITY_THRESHOLD || obj == null) {
			break;
		}

		doWorkWithObject(obj);

	} while (false);

	doRelatedWork(obj);
}
```

There are some very rare cases, where I find some logic fits better under the same functions. In this case, we can use a break-block. This should only be used, if the level of nesting is getting dangerous and there's no other way around it. Document heavily.

### Conclusion

Hopefully you will find these tips and tricks as helpful as I did, when I first learned of it. Becareful not to over-use it. See if you can avoid the conditional by having a better understanding of the problem. If not, then use away!
ly, programmers have developed techniques to prevent deep nesting and I will be going over some of these techniques with you today.

IGNORE BELOW

```javascript
const functionWithDeepNesting = (flag, objectName) => {

	complexity = getComplexity()

	if (complexity < SANITY_THRESHOLD) {
	
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

Here's the revised version of the code above. At most,
there is 1 level of nesting compare to the 4 in the previous version.
Logic are broken down to their own functions and can be re-used
elsewhere, if needed. Lastly, I must caution the over-use of these
methods. There's no need to use guard functions if it's more than
2-3 lines of code. There's no need to create methods to disguise complexity
for another form of complexity. Finally, if the logic makes sense
inside one function then keep it in the same function. However, I hope 
you will consider some of these techinques when nesting is getting out of hand.
