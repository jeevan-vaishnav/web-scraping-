const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const app = express();
const { Parser } = require("json2csv");
const fs = require("fs");


app.set("view engine", "ejs"); // Set EJS as the template engine
app.set("views", "./views"); // Set the views directory
app.use(express.static("public")); // Serve static files (like CSS)

const baseURL = "https://www.cricketworld.com";
const URL =
  "https://www.cricketworld.com/cricket/series/emirates-d10-tournament-2024/fixtures/129433";

// async function processRow(row) {
//   const matchLink = baseURL + row.attr("href");
//   const tournamentName = row.find(".title").text().trim();
//   const matchNumber = row.find(".subtitle").first().text().trim();
//   const status = row.find(".status").first().text().trim(); // Match status
//   const date = row.find(".day").text().trim(); // Match date
//   const venue = row.find(".venue").text().trim(); // Venue
//   const teamAName = row.find(".teama .teamName").text().trim(); // Team A name
//   const teamAScore = row.find(".teama .teamScore").text().trim(); // Team A score
//   const teamBName = row.find(".teamb .teamName").text().trim(); // Team B name
//   const teamBScore = row.find(".teamb .teamScore").text().trim(); // Team B score
//   const result = row.find(".column-action .status_note").text().trim(); //
//   // console.log(`Fetching details for match: ${matchNumber} (${tournamentName})`);

//   try {
//     const { data } = await axios.get(matchLink);
//     const matchPage = cheerio.load(data);
//     // Extract Match Header Information
//     const matchTitle = matchPage(".match-header .title").text().trim();
//     const matchStatus = matchPage(".match-header .status").text().trim();
//     const tournamentName = matchPage(".match-header .match-info a")
//       .text()
//       .trim();

//     const teamA = {
//       name: matchPage(".match-header .teama .teamName").text().trim(),
//       abbreviation: matchPage(".match-header .teama .teamAbbr").text().trim(),
//       score: matchPage(".match-header .teama .teamScore").text().trim(),
//       logo: matchPage(".match-header .teama .teamLogo img").attr("src"),
//     };
//     const teamB = {
//       name: matchPage(".match-header .teamb .teamName").text().trim(),
//       abbreviation: matchPage(".match-header .teamb .teamAbbr").text().trim(),
//       score: matchPage(".match-header .teamb .teamScore").text().trim(),
//       logo: matchPage(".match-header .teamb .teamLogo img").attr("src"),
//     };

//     const matchResult = matchPage(".match-header .status_note").text().trim();
//     const teamNameA =  matchPage(".match-header .teama .teamName").text().trim()
//     const teamNameB =  matchPage(".match-header .teamb .teamName").text().trim()

//     // Log the extracted information

//     //Extra Match Content Information ?
//     // Extract Scoreboard Data
//     const scorecards = [];
//     matchPage("#match-scorecards .accordion").each((i, element) => {
//       const headers = {};
//       matchPage(element)
//         .find(".header1 th")
//         .each((index, header) => {
//           const headerText = matchPage(header).text().trim();
//           if (headerText === "Batters") headers["batsmanName"] = "col-player";
//           else if (headerText === "R") headers["runs"] = "col-runs";
//           else if (headerText === "B") headers["balls"] = "col-balls";
//           else if (headerText === "4S") headers["fours"] = "col-fours";
//           else if (headerText === "6S") headers["sixes"] = "col-sixes";
//           else if (headerText === "SR") headers["strikeRate"] = "col-sr";
//         });
//       // Extract data dynamically based on headers
//       const scores = [];
//       matchPage(element)
//         .find(".row-batsman")
//         .each((j, row) => {
//           const score = {};
//           for (const [key, className] of Object.entries(headers)) {
//             score[key] = matchPage(row).find(`.${className}`).text().trim();
//           }
//           scores.push(score);
//         });
//       // Push inning data to scorecards
//       const inningName = matchPage(element).find(".inning-name").text().trim();
//       // const battingTeam = matchPage(element).find('.batting-team').text().trim();
//       // const bowlingTeam = matchPage(element).find('.bowling-team').text().trim();
//       scorecards.push({
//         matchTitle,
//         matchStatus,
//         tournamentName,
//         inningName,
//         matchNumber,
//         scores,
//       });
//     });

//     return {teamNameA,teamNameB,scorecards }; // Return data;
//   } catch (error) {
//     console.error(`Error fetching details for match ${matchNumber}:`, error);
//     return { matchNumber, error: error.message }; // Return error details
//   }
// }
// async function processRow(row) {
//   const matchLink = baseURL + row.attr("href");
//   const tournamentName = row.find(".title").text().trim();
//   const matchNumber = row.find(".subtitle").first().text().trim();
//   const status = row.find(".status").first().text().trim(); // Match status
//   const date = row.find(".day").text().trim(); // Match date
//   const venue = row.find(".venue").text().trim(); // Venue
//   const teamAName = row.find(".teama .teamName").text().trim(); // Team A name
//   const teamAScore = row.find(".teama .teamScore").text().trim(); // Team A score
//   const teamBName = row.find(".teamb .teamName").text().trim(); // Team B name
//   const teamBScore = row.find(".teamb .teamScore").text().trim(); // Team B score
//   const result = row.find(".column-action .status_note").text().trim(); // Match result

//   try {
//     const { data } = await axios.get(matchLink);
//     const matchPage = cheerio.load(data);

//     // Extract match header information
//     const matchTitle = matchPage(".match-header .title").text().trim();
//     const matchStatus = matchPage(".match-header .status").text().trim();
//     const tournamentName = matchPage(".match-header .match-info a").text().trim();

//     const teamA = {
//       name: matchPage(".match-header .teama .teamName").text().trim(),
//       score: matchPage(".match-header .teama .teamScore").text().trim(),
//     };
//     const teamB = {
//       name: matchPage(".match-header .teamb .teamName").text().trim(),
//       score: matchPage(".match-header .teamb .teamScore").text().trim(),
//     };

//     const matchResult = matchPage(".match-header .status_note").text().trim();

//     // Extract scorecard data dynamically
//     const scorecards = [];
//     matchPage("#match-scorecards .accordion").each((i, element) => {
//       const headers = {};
//       matchPage(element)
//         .find(".header1 th")
//         .each((index, header) => {
//           const headerText = matchPage(header).text().trim();
//           if (headerText === "Batters") headers["batsmanName"] = "col-player";
//           else if (headerText === "R") headers["runs"] = "col-runs";
//           else if (headerText === "B") headers["balls"] = "col-balls";
//           else if (headerText === "4S") headers["fours"] = "col-fours";
//           else if (headerText === "6S") headers["sixes"] = "col-sixes";
//           else if (headerText === "SR") headers["strikeRate"] = "col-sr";
//         });

//       // Extract score details
//       const scores = [];
//       matchPage(element)
//         .find(".row-batsman")
//         .each((j, row) => {
//           const score = {};
//           for (const [key, className] of Object.entries(headers)) {
//             score[key] = matchPage(row).find(`.${className}`).text().trim();
//           }
//           scores.push(score);
//         });

//       // Collect inning and scorecard data
//       const inningName = matchPage(element).find(".inning-name").text().trim();
//       scorecards.push({
//         matchTitle,
//         matchStatus,
//         tournamentName,
//         inningName,
//         matchNumber,
//         scores,
//       });
//     });

//     return {
//       matchTitle,
//       matchStatus,
//       tournamentName,
//       matchNumber,
//       date,
//       venue,
//       teamA,
//       teamB,
//       scorecards,
//     };
//   } catch (error) {
//     console.error(`Error fetching details for match ${matchNumber}:`, error);
//     return { matchNumber, error: error.message }; // Return error details
//   }
// }


// async function processRow(row) {
//   const baseURL = "https://example.com"; // Replace with the actual base URL
//   const matchLink = baseURL + row.attr("href");
//   const matchNumber = row.find(".subtitle").first().text().trim();
  
//   try {
//     const { data } = await axios.get(matchLink);
//     const matchPage = cheerio.load(data);

//     // Extract match data
//     const matchTitle = matchPage(".match-header .title").text().trim();
//     const matchStatus = matchPage(".match-header .status").text().trim();
//     const tournamentName = matchPage(".match-header .match-info a").text().trim();
//     const date = matchPage(".match-header .match-date").text().trim();
//     const venue = matchPage(".match-header .venue").text().trim();
//     const teamA = matchPage(".match-header .teama .teamName").text().trim();
//     const teamB = matchPage(".match-header .teamb .teamName").text().trim();
//     const result = matchPage(".match-header .status_note").text().trim();

//     // Extract scorecards
//     const scorecards = [];
//     matchPage("#match-scorecards .accordion").each((i, element) => {
//       const inningName = matchPage(element).find(".inning-name").text().trim();

//       matchPage(element)
//         .find(".row-batsman")
//         .each((j, row) => {
//           const batsmanName = matchPage(row).find(".col-player").text().trim();
//           const runs = matchPage(row).find(".col-runs").text().trim();
//           const balls = matchPage(row).find(".col-balls").text().trim();
//           const fours = matchPage(row).find(".col-fours").text().trim();
//           const sixes = matchPage(row).find(".col-sixes").text().trim();
//           const strikeRate = matchPage(row).find(".col-sr").text().trim();

//           scorecards.push({
//             matchTitle,
//             matchStatus,
//             tournamentName,
//             matchNumber,
//             date,
//             venue,
//             teamA,
//             teamB,
//             result,
//             inningName,
//             batsmanName,
//             runs,
//             balls,
//             fours,
//             sixes,
//             strikeRate,
//           });
//         });
//     });

//     // Write data to CSV
//     const fields = [
//       "matchTitle",
//       "matchStatus",
//       "tournamentName",
//       "matchNumber",
//       "date",
//       "venue",
//       "teamA",
//       "teamB",
//       "result",
//       "inningName",
//       "batsmanName",
//       "runs",
//       "balls",
//       "fours",
//       "sixes",
//       "strikeRate",
//     ];
//     const json2csvParser = new Parser({ fields });
//     const csv = json2csvParser.parse(scorecards);

//     fs.writeFileSync("match_data.csv", csv);
//     console.log("CSV file created successfully!");
//   } catch (error) {
//     console.error(`Error processing match ${matchNumber}:`, error.message);
//   }
// }

async function processRow(row) {
  const matchLink = baseURL + row.attr("href");
  const tournamentName = row.find(".title").text().trim();
  const matchNumber = row.find(".subtitle").first().text().trim();
  const status = row.find(".status").first().text().trim(); // Match status
  const date = row.find(".day").text().trim(); // Match date
  const venue = row.find(".venue").text().trim(); // Venue
  const teamAName = row.find(".teama .teamName").text().trim(); // Team A name
  const teamAScore = row.find(".teama .teamScore").text().trim(); // Team A score
  const teamBName = row.find(".teamb .teamName").text().trim(); // Team B name
  const teamBScore = row.find(".teamb .teamScore").text().trim(); // Team B score
  const result = row.find(".column-action .status_note").text().trim(); // Match result

  try {
    const { data } = await axios.get(matchLink);
    const matchPage = cheerio.load(data);

    // Extract match header information
    const matchTitle = matchPage(".match-header .title").text().trim();
    const matchStatus = matchPage(".match-header .status").text().trim();
    const tournamentNameFromPage = matchPage(".match-header .match-info a").text().trim();

    const teamA = {
      name: matchPage(".match-header .teama .teamName").text().trim(),
      score: matchPage(".match-header .teama .teamScore").text().trim(),
    };
    const teamB = {
      name: matchPage(".match-header .teamb .teamName").text().trim(),
      score: matchPage(".match-header .teamb .teamScore").text().trim(),
    };

    const matchResult = matchPage(".match-header .status_note").text().trim();

    // Extract scorecard data dynamically
    const scorecards = [];
    matchPage("#match-scorecards .accordion").each((i, element) => {
      const headers = {};
      matchPage(element)
        .find(".header1 th")
        .each((index, header) => {
          const headerText = matchPage(header).text().trim();
          if (headerText === "Batters") headers["batsmanName"] = "col-player";
          else if (headerText === "R") headers["runs"] = "col-runs";
          else if (headerText === "B") headers["balls"] = "col-balls";
          else if (headerText === "4S") headers["fours"] = "col-fours";
          else if (headerText === "6S") headers["sixes"] = "col-sixes";
          else if (headerText === "SR") headers["strikeRate"] = "col-sr";
        });

      // Extract score details
      const scores = [];
      matchPage(element)
        .find(".row-batsman")
        .each((j, row) => {
          const score = {};
          for (const [key, className] of Object.entries(headers)) {
            score[key] = matchPage(row).find(`.${className}`).text().trim();
          }
          scores.push(score);
        });

      // Collect inning and scorecard data
      const inningName = matchPage(element).find(".inning-name").text().trim();
      scorecards.push({
        matchTitle,
        matchStatus,
        tournamentName: tournamentNameFromPage,
        inningName,
        matchNumber,
        scores,
      });
    });

    return {
      matchTitle,
      matchStatus,
      tournamentName: tournamentNameFromPage,
      matchNumber,
      date,
      venue,
      teamA,
      teamB,
      scorecards,
    };
  } catch (error) {
    console.error(`Error processing match ${matchNumber}:`, error.message);
    console.error(`Full error stack: ${error.stack}`);
    return { matchNumber, error: error.message }; // Return error details
  }
}


(async () => {
  try {
    const { data } = await axios.get(URL);
    console.log("Request succeeded!");
    const $ = cheerio.load(data);
    const matchRows = $("a.match-row");

    // Convert the jQuery map into an array of promises
    const fetchPromises = matchRows.toArray().map(async (element) => {
      return await processRow($(element)); // Call processRow with each match row element
    });

    const results = await Promise.all(fetchPromises);
    console.log(JSON.stringify(results, null, 2));

    return results; // Return all match data
  } catch (error) {
    console.error("Request failed:", error.message);
    return null;
  }
})();


//  ( async () => {
//   try {
//     const { data } = await axios.get(URL);
//     console.log("Request succeeded!");
//     const $ = cheerio.load(data);
//     const matchRows = $("a.match-row");
//     const fetchPromises = matchRows.map(async (i, element) => {
//       return await processRow($(element)); // Map each row to a promise
      
//     });

//     const results = await Promise.all(fetchPromises);
//     console.log(JSON.stringify(results, null, 2));

//     return results; // Return all match data
//   } catch (error) {
//     console.error("Request failed:", error.message);
//     return null;
//   }
// })()

// app.get("/", async (req, res) => {
//   const scorecards = await fetchScorecards();
//   console.log("Fetched Scorecards:", JSON.stringify(scorecards, null, 2));
// });

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
