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
        <pre><code class="language-javascript">
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
        </code></pre>