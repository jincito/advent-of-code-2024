import * as fs from "fs";

function readInputFile(filePath: string): string[] {
    try {
        const file = fs.readFileSync(filePath, "utf-8").trim();
        return file.split("\n").filter(row => row !== ""); // skip empties
    } catch (error) {
        console.error("Error reading input file:", (error as Error).message);
        process.exit(1); // exit error code
    }
}

function parseInput(reportArr: string[]): number {
    let safeReports = 0;

    for (const row of reportArr) {
        const reports = row.split(" ").map(Number); // nums get converted at init
        if (reports.length < 2) {
            continue; // skip rows with less than two numbers
        }
        
        let increasingOrDecreasing: "increasing" | "decreasing" | undefined;
        let isSafeReport = true;

        for (let i = 1; i < reports.length; i++) {
            const current = reports[i];
            const previous = reports[i - 1];
            const difference = current - previous;

            if (!increasingOrDecreasing) {
                // determine the initial increase or decrease trend
                increasingOrDecreasing = difference > 0 ? "increasing" : "decreasing";
            }

            // validate level order
            if (
                (increasingOrDecreasing === "increasing" && !(1 <= difference && difference <= 3)) ||
                (increasingOrDecreasing === "decreasing" && !(-3 <= difference && difference <= -1))
            ) {
                isSafeReport = false;
                break;
            }
        }

        if (isSafeReport) {
            safeReports++;
        }
    }

    return safeReports;
}

const filePath = "input-02.txt";
const reportArr = readInputFile(filePath);
const safeReportCount = parseInput(reportArr);

console.log(`P1: # of Safe Reports: ${safeReportCount}`);
