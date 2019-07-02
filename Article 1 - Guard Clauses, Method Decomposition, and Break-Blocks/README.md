# Dealing with Deep Nested Code (Part 1)

Dealing with deep-nested code can be exhausting and mentally draining. It is often a significant source of code smell in your codebase. If you find it difficult to read, don't worry, you're not the only one. Studies have found few people can understand nesting past three levels (Include Source). Deep nesting results in overly complicated software that is hard to read, maintain, and work on. We should do our best to avoid it!

It is necessary! How can we code without if-else and switch statements? 

Well, it is not exactly necessary. Complicated code and deep nesting, often, happens when there is a lack of understanding of the problem. This results in an over-use of if-else and switch statements.

Wait, no! The problem is well-understood, and there is no other way around it.

Okay, you are right! Some problems do require such complexity. In fact, enterprise applications are littered with deep-nested code. However, these are also the projects that require a programmer's weekend and sanity to develop and maintain. These projects may end up failing as well, and no one wants that. Fortunately, our predecessors have developed techniques to prevent deep nesting, and I will be going over some of these techniques with you today.

### Use Guard Clauses

Guard clauses are simple conditionals that filter out invalid conditions and will return from the function. They're often used to check if a value is NULL, in range, or meets specific criteria. Simply put, they guard your functions against invalid conditions.

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

Which one did you like more? Hopefully, you prefer the second one because I did. I prefer the second for 3 primary reasons:

1. The primary logic is not nested at all, making it very easy to read. <br />
2. You do not have to look further down than the return statement <br />
3. Clearly shows the author's intentions
<br />
 
Code without nesting is easier to read than any nesting. Since the guard clause clearly shows the function returns when it is NULL, we do not have to consider NULLs when reading further the code afterward. In the first function, you're left wondering... "Okay, this is for the non-NULL case. The NULL case will be at the bottom..." as you read. By having less to juggle in mind, the reader will be able to focus and absorb the core logic better. Intentions are much clearer in the second function.

The first function says: "If the node exists, print!"
The second function says: "Print node!"

Be careful using guard clauses. The two functions below are not equivalent. 

Before reading further, imagine the made-up functions I used in the examples below are actually 10-20 lines of code, and it might not be possible to decompose them into smaller functions.

```javascript
function withDeepNestedConditions(obj) {

	if (obj != null) {

		if (calcComplexity(obj) < SANITY_THRESHOLD) {
			doWorkWithObject(obj);
		} else {
            		log(obj)
        	}

	}
		
	doPostProcessWork(obj);
	
}

function wontWorkWithGuardClauses(obj) {

	if (obj === null) {
		return;
	}

	if (calcComplexity(obj) >= SANITY_THRESHOLD) {
		log(obj);
		return;
	}

	doWorkWithObject(obj);
	doPostProcessWork(obj);
}
```

```javascript
function willWorkWithGuardClauses(obj) {

	if (obj === null) {
		return;
	}
	
	if (calcComplexity(obj) >= SANITY_THRESHOLD) {
        	log(obj);
		doPostProcessWork(obj);
		return;
	}

	doWorkWithObject(obj);
	doPostProcessWork(obj);
	
}

```

As you can see, if complexity is false, Function #1 will execute doMoreWorkOnObject(), while Function #2 will simply return out of the statement. Ideally, doMoreWorkOnObject() should not be inside, but should be in the calling function. So to use guard clauses, it is best to decompose large functions into smaller ones.

Which brings us to another familiar and straightforward technique...

### Decompose into Functions

Abstract out the complexity into small modular functions. You can almost keep everything to one level of nesting, by decomposing everything into its own function. However, it should not be over-used. A simple rule to follow is, if you have trouble naming the new function, then the logic within it does not justify creating another function. Creating another function is complexity in itself. So, at the end of the day, you're obfuscating the complexity. A well-decomposed function will abstract out complexity and show clearer intentions. Use sparingly!

```javascript
function doAlotOfWork(obj, user) {

	if (obj === null) {
		return;
    	}
    
    	if (user === null) {
        	user = getDefaultUser()
    	}

	if (calcComplexity(obj) < user.getSanityThreshold()) {

        let stats = user.doWorkWithObject(obj);
        
		if (stats.getValue() >= 10) {

            		if (validateStats(stats)) {

                		if (processStats(stats)) { 
                    			console.log('Work stats persisted in database successfully');
                		} else {
                    			console.log('Work stats not persisted in database, defaulting to log file');
                    			writeStatsToFile(stats);
                		}

            		} else {
                		console.log('Invalid stats');
            		}

        	} else {
            		console.log('Processed stats is less than 10: ', stats);
        	}

	}

	doPostProcessWork(obj);
}
```

Now broken down into two parts...

```javascript
function getStatisticsFromObject(obj, user) {

    if (obj === null) {
		return;
    }
    
    if (user === null) {
        user = getDefaultUser()
    }

    if (calcComplexity(obj) < user.getSanityThreshold()) {
        
        let stats = user.doWorkWithObject(obj);

        if (stats.getValue >= 10) {
            persistUserStats(stats);
        } else {
            console.log('Processed stats is less than 10: ', stats);
        }

    }

    // Ideally this should be move to the caller of firstPart
    doPostProcessWork();

}

function persistUserStats(stats) {
    
    if (validateStats(stats)) {

        if (processStats(stats)) { 
            console.log('Work stats persisted in database successfully');
        } else {
            console.log('Work stats not persisted in database, defaulting to log file');
            writeStatsToFile(stats);
        }

    } else {
        console.log('Invalid stats');
    }   

}
```

In the first example, we have four levels of nesting, and in the second example, we have two levels. All we did was split it into two, and we have a reduction of two levels. You can continue breaking it down, but I find this easy enough to read. Breaking it down further would result in more functions and time spent deliberating on an appropriate name.


### Use Break Blocks (Rare)

Finally, here's a neat trick that may be useful in select scenarios. In these scenarios, I find certain logic fits better under the same function. In this case, we can use a break-block.

```javascript
function persistUserStats(obj, user) {

    if (obj === null) {
        return;
    }

    if (user === null) {
        user = getDefaultUser();
    }

    do {

        if (calcComplexity(obj) >= user.getSanityThreshold()) {
            break;
        }

        let stats = user.doWorkWithObject(obj);

        if (stats.getValue() < 10) {
            console.log('Processed stats is less than 10: ', stats);
            break;
        }

        if (!validateStats(stats)) {
            console.log('Invalid stats');
            break;
        }

        if (processStats(stats)) {
            console.log('Work stats persisted in database successfully');
        } else {
            console.log('Work stats not persisted in database, defaulting to log file');
            writeStatsToFile(stats);
        }

    } while (false);

    doPostProcessWork(obj);
    
}
```

This should be used if the level of nesting is getting dangerous, and there's no other way around it. Document heavily.

### Conclusion

Hopefully, you will find these tips and tricks helpful as I did, when I first learned of it. Be careful not to over-use it. See if you can avoid the conditional by having a better understanding of the problem. If not, then use away!
