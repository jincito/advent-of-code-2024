import * as fs from "fs";

// read the file and handle errors
function readInputFile(filePath: string): string[] {
    try {
      const file = fs.readFileSync(filePath, "utf-8").trim();
      return file.split("\n");
    } catch (error) {
      console.error("Error reading input file:", (error as Error).message);
      process.exit(1); // exit error code
    }
}

// parse the nums in file into two arrays
function parseInput(fileArr: string[]): [number[], number[]] {
  const leftArr: number[] = [];
  const rightArr: number[] = [];

  fileArr.forEach((row) => {
    if (row === "") {
        return; // skip empties
    }
    
    // regular expression to split by 3 spaces
    const nums = row.split(/\s{3}/);

    // validate that we got exactly two numbers
    if (nums.length !== 2 || isNaN(Number(nums[0])) || isNaN(Number(nums[1]))) {
      console.error(`Invalid line: "${row}". Skipping this row.`);
      return; // skip invalid row
    }

    // push nums into arrays: left and right
    leftArr.push(Number(nums[0]));
    rightArr.push(Number(nums[1]));
  });

  return [leftArr, rightArr];
}

// calculate the sum of differences between two sorted arrays
function calculateDifference(leftArr: number[], rightArr: number[]): number {
  // sort the arrays
  const sortedLeft = leftArr.sort();
  const sortedRight = rightArr.sort();

  // calculate the sum of differences
  return sortedLeft.reduce((sum, val, i) => {
    return sum + Math.abs(val - sortedRight[i]); // absolute difference between corresponding elements
  }, 0);
}

// main
const filePath = "./input-01.txt";
const fileArr = readInputFile(filePath);
const [leftArr, rightArr] = parseInput(fileArr);
const sum = calculateDifference(leftArr, rightArr);

console.log(`P1: The sum is ${sum}`);
