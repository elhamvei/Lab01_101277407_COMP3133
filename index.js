const csv = require('csv-parser');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const canada = []
const usa = []

fs.createReadStream('input_countries.csv')
    .pipe(csv())
    .on('data', (row) => {
        if (row.country == "Canada")
            canada.push(row);
        if (row.country == "United States")
            usa.push(row);
    })
    .on('end', () => {
        const csvCanada = createCsvWriter({
            path: 'canada.txt',
            header: [
                { id: 'country', title: 'country' },
                { id: 'year', title: 'year' },
                { id: 'population', title: 'population' }
            ]
        });

        csvCanada
            .writeRecords(canada)
            .then(() => console.log('The Canada text file was written successfully'));


        const csvUsa = createCsvWriter({
            path: 'usa.txt',
            header: [
                { id: 'country', title: 'country' },
                { id: 'year', title: 'year' },
                { id: 'population', title: 'population' }
            ]
        });

        csvUsa
            .writeRecords(usa)
            .then(() => console.log('The USA text file was written successfully'));

    });

