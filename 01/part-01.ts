import * as fs from "node:fs";

// read file
const file = fs.readFileSync("./input-01.txt").toString();
const fileArr = file.split("\n");

// sort left / right columns into separate arrays
const leftArr: number[] = [];
const rightArr: number[] = [];

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
    leftArr.push(new Number(nums[0]).valueOf())
    rightArr.push(new Number(nums[1]).valueOf())
}

// sort arrays
// idc about big O complexity right now, just getting to a solution
const sortedLeft = leftArr.sort();
const sortedRight = rightArr.sort();

let sum = 0;

sortedLeft.forEach((val, i) => {
    // subtract the lesser number from the greater number to get the difference
    // add up the difference between the two numbers to get the final answer
    if(val > sortedRight[i]) {
        sum += val - sortedRight[i]
    } else {
        sum += sortedRight[i] - val
    }
})

console.log(`P1: The sum is ${sum}`)
