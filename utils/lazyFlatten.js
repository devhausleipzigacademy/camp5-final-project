function isIterable(obj) {
  if (obj == null) {
    return false;
  }
  return typeof obj[Symbol.iterator] === "function";
}

function isObject(obj) {
  return (
    obj !== null && typeof obj === "object" && Array.isArray(obj) === false
  );
}

export function* generatePathLeafPairs(collection, path = []) {
  console.log(collection);
  if (isObject(collection)) {
    console.log("object", collection);
    for (const [key, value] of Object.entries(collection)) {
      yield* generatePathLeafPairs(value, [...path, key]);
    }
  } else if (Array.isArray(collection)) {
    console.log("array", collection);
    yield* collection.map((element) => {
      return [path, element];
    });
  } else {
    throw new Error(`Unrecognized node type: ${typeof collection}`);
  }
}

//////////////////////////
////// Experimental //////
//////////////////////////

// function* lazyFlatten(collection: any): any {
// 	if (
// 		isIterable(collection) &&
// 		!isObject(collection) &&
// 		typeof collection !== "string"
// 	) {
// 		for (const element of collection) {
// 			if (
// 				isIterable(collection) &&
// 				!isObject(collection) &&
// 				typeof collection !== "string"
// 			) {
// 				yield* lazyFlatten(element);
// 			} else {
// 				yield element;
// 			}
// 		}
// 	} else {
// 		yield collection;
// 	}
// }

// class Ontology {
// 	label;
// 	descendants;

// 	//@ts-ignore
// 	constructor(label, descendants) {
// 		this.label = label;
// 		this.descendants = descendants;
// 	}

// 	[Symbol.iterator]() {
// 		const descendants = this.descendants;
// 		return {
// 			next: function () {
// 				const incoming = lazyFlatten(descendants);
// 				return {
// 					value: incoming.value,
// 					done: incoming.done,
// 				};
// 			},
// 		};
// 	}

// 	*chain(ontology: Ontology) {
// 		//@ts-ignore
// 		yield* this;
// 		//@ts-ignore
// 		yield* ontology;
// 	}
// }
