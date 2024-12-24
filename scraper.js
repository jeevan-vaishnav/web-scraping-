const axios = require('axios');
const cheerio = require('cheerio');

axios.get('https://www.cricketworld.com/cricket/series/emirates-d10-tournament-2024/fixtures/129433')
.then(({data})=>{
    
    const $ = cheerio.load(data);
    
    const matchRows = $('a.match-row');

    matchRows.each(((index,element)=>{
        const tournamentName = $(element).find('.title').text().trim(); // Tournament name
        const status = $(element).find('.status').first().text().trim(); // Match status
        const date = $(element).find('.day').text().trim(); // Match date
        const matchNumber = $(element).find('.subtitle').first().text().trim(); // Match number
        const venue = $(element).find('.venue').text().trim(); // Venue
  
        const teamAName = $(element).find('.teama .teamName').text().trim(); // Team A name
        const teamAScore = $(element).find('.teama .teamScore').text().trim(); // Team A score
  
        const teamBName = $(element).find('.teamb .teamName').text().trim(); // Team B name
        const teamBScore = $(element).find('.teamb .teamScore').text().trim(); // Team B score

        const result = $(element).find('.column-action .status_note').text().trim(); //  
        console.log(`
            Tournament: ${tournamentName}
            Status: ${status}
            Date: ${date}
            Match: ${matchNumber}
            Venue: ${venue}
            Team A: ${teamAName} (${teamAScore})
            Team B: ${teamBName} (${teamBScore})
            Result: ${result}
          `);    
    }))
}).catch((error) => {
    console.error('Error fetching data:', error);
  })