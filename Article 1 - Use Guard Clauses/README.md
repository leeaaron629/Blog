# Dealing with Deep Nested Code (Part 1)

Dealing with deep nested code can be difficult and mentally draining. It is often a major source of code smell in your codebase. If you find it difficult to read, don't worry, you're not the only one. Studies have found few people can understand nesting past three levels. (Include Source) Deep nesting results in complex software that is hard to read, maintain, and work on. Everyone should avoid it!

... It is necessary! Conditionals are fundamental tools of programming (Imperative). 

Well, not exactly. Complicated code and deep nesting, often, occurs when there is a lack in understanding of the problem.

... You may disagree and say no. You understand the problem and there is no other way around it.

Okay, you are right! There are some problems that require such complexity. In fact, enterprise applications are littered with deep nested code. However, these are also the projects that requires a programmer's weekend and sanity to develop and maintain. These projects may end up failing as well and no one wants that. Fortunately, programmers have developed techniques to prevent deep nesting and I will be going over some of these techniques with you today.

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
 
Code without nesting is easier to read than any nesting. Since the guard clause clearly shows the function returns when it is NULL, we do not have to consider NULLs when reading further down. However, in the first function, you're left wondering... "Okay, this is for the non-NULL case. The NULL case will be at the bottom...", while reading the primary logic. By having less to juggle in the mind, the reader will be able to understand the core logic better. Finally, the second one shows clearer intentions. 

The first function says: "If node exists, print!" <br />
The second function says: "Print node!"

However, there's a caveat with using guard clauses. The two functions below are not equivalent.

```javascript
const functionWithDeepNestedConditions = (obj) => {

	if (obj != null) {
		if (getComplexity(obj) < SANITY_THRESHOLD) {
			doWorkWithObject(obj);
		}
	}
		
	doUnrelatedWork();
	
}

// What's the flag parameter doing here?
const functionThatWontWorkWithGuardClauses = (flag, obj) => {

	if (obj == null) {
		return;
	}

	if (getComplexity(obj) < SANITY_THRESHOLD) {
		return;
	}

	doWorkWithObject(obj);
	doUnrelatedWork();
}
```

```javascript
// The example could be better. This is how it would be done with a guard clause
const functionThatWillWorkWithGuardClauses = (obj) => {
	if (obj === null || getComplexity(obj) >= SANITY_THRESHOLD) {
		return doUnrelatedWork();
	}

	doWorkWithObject(obj);
	doUnrelatedWork();
}
```

But the use of guard clauses usually makes the conditionals in your if statements really confusing. This is because, instead of relying nested conditionals, now you have to chain conditionals to avoid nesting. To make it more readable, you can mention that you can pull that big conditional out into it's own method

```javascript
const functionThatWillWorkWithGuardClauses = (obj) => {
	if (isObjectValid(obj)) {
		return doUnrelatedWork();
	}

	doWorkWithObject(obj);
	doUnrelatedWork();
}

const isObjectValid = (obj) => {
	return obj === null || getComplexity(obj) >= SANITY_THRESHOLD
}
```

Also, if the order that the functions executes doesn't matter, then this is also valid
```javascript
const functionWithDeepNestedConditions = (obj) => {
	doUnrelatedWork();

	if (isObjectValid(obj)) {
		return;
	}
		
	doWorkWithObject(obj);
}
```

If complexity is false, Function #1 will perform doUnrelatedWork(), while Function #2 will simply return out of the statement. Ideally, doUnrelatedWork() should not be inside, but should be in the calling function. So to use guard clauses, you would have to decompose large functions into smaller ones.

Which brings me to my next technique...

### Decompose into Functions

Abstract out the complexity into small modular functions.

You can almost keep everything to a nesting of one level, if you decompose everything into its own function. However, it should not be over-used. A simple rule to follow is, if you have trouble naming the new function, then the logic within the function does not justify creating another method. Creating another method is complexity in itself. So, at the end of the day you're obfuscating the complexity. A well decomposed function will abstract out the complexity and show clearer intentions. Use sparingly!

```javascript
const  = (obj) => {

	complexity = getComplexity(obj)

	if (complexity < SANITY_THRESHOLD) {
		// not sure what this line is doing. Might make your example confusing and harder to follow
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

// Why don't you using guard clauses in this example?
const secondLevelNestingWork = (stats) => {
	if (stats === null) {
		return console.log('Failed! No work stats from object');
	}

	const success = processStats(stats);

	if (!success) {
		console.log('Work stats not persisted in database, defaulting to log file');
		return writeStatsToFile(stats);
	}

	console.log('Work stats persisted in database successfully');
}
```

I can create another function for the third level, but for now it looks great with one less level of nesting.

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

There are rare cases, where I find certain logic fits better under the same functions. In this case, we can use a break-block. This should only be used, if the level of nesting is getting dangerous and there's no other way around it. Document heavily.

### Conclusion

Hopefully you will find these tips and tricks helpful as I did, when I first learned of it. Becareful not to over-use it. See if you can avoid the conditional by having a better understanding of the problem. If not, then use away!

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
