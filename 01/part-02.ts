import * as fs from "fs";

// read input file and process the data
function readInputFile(filePath: string): { leftArr: number[], rightArrIndex: Map<number, number> } {
  const file = fs.readFileSync(filePath, "utf-8").trim();
  const fileArr = file.split("\n");

  const leftArr: number[] = [];
  const rightArrIndex: Map<number, number> = new Map();

  // iterate through the rows, process the data and populate arrays/maps
  for (const row of fileArr) {
    if (row.trim() === "") {
        continue;
    }
    
    const [leftStr, rightStr] = row.split("   ");
    if (!leftStr || !rightStr) {
      throw new Error("No valid numbers found in row");
    }

    const leftNum = parseInt(leftStr, 10);
    const rightNum = parseInt(rightStr, 10);

    leftArr.push(leftNum);
    rightArrIndex.set(rightNum, (rightArrIndex.get(rightNum) ?? 0) + 1);
  }

  return { leftArr, rightArrIndex };
}

// calculate the similarity score
function calculateSimilarityScore(leftArr: number[], rightArrIndex: Map<number, number>): number {
  let similarityScore = 0;

  // checking occurrences of numbers in the right column
  leftArr.forEach((leftKey) => {
    const countInRight = rightArrIndex.get(leftKey) ?? 0;
    similarityScore += leftKey * countInRight;
  });

  return similarityScore;
}

function main() {
  try {
    const { leftArr, rightArrIndex } = readInputFile("./input-01.txt");
    const similarityScore = calculateSimilarityScore(leftArr, rightArrIndex);

    console.log(`P2: Similarity score is: ${similarityScore}`);
  } catch (error) {
    console.error("Error:", (error as Error).message);
  }
}

main();
