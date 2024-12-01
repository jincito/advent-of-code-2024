import * as fs from "node:fs";

// read file
const file = fs.readFileSync("./input-01.txt").toString();
const fileArr = file.split("\n");

const leftArr: number[] = [];
// these maps will help us count how many occurrences of each number there are
// in both columns
// we'll count them as we loop through the rows to save a bit of time
const leftArrIndex: Map<number, number> = new Map();
const rightArrIndex: Map<number, number> = new Map();

// we're going to need to check that what we're consuming is actually a number at some point..
for (const row of fileArr) {
    if(row === "") {
        continue;
    }
    // the numbers are separated by 3 space characters
    const nums = row.split("   ")

    // there might be an error thrown in the below code, but in this case, we want to crash
    // the program, not really clear what to do in the case of an error, there's nothing we can do
    // to handle it gracefully at the moment
    if(!nums[0] && !nums[1] || nums.length === 1) {
        throw new Error("No valid nums found")
    }

    const leftNum = new Number(nums[0]).valueOf()
    const rightNum = new Number(nums[1]).valueOf()

    leftArr.push(leftNum);

    // check if num has been counted in its appropriate index
    leftArrIndex.set(leftNum, (leftArrIndex.get(leftNum) ?? 0) + 1);
    rightArrIndex.set(rightNum, (rightArrIndex.get(rightNum) ?? 0) + 1);
}

let similarityScore = 0;

for (const leftKey of leftArr) {
    if(!rightArrIndex.get(leftKey)) {
        console.log(`${leftKey} does not appear in right column, continuing`)
        continue;
    } else {
        console.log(`${leftKey} appears in rightArr ${rightArrIndex.get(leftKey)} times, multiplied together is ${leftKey * rightArrIndex.get(leftKey)!}`)
        similarityScore += leftKey * rightArrIndex.get(leftKey)!;
    }
}

console.log(`P2: similarity score is: ${similarityScore}`);
