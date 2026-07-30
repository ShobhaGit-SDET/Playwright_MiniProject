import {test,expect}from  '@playwright/test';
import * as fs from 'fs';
// import * as path from 'path';   
// import * as csv from 'csv-parser';

import {parse}from 'csv-parse/sync';

test.describe('Data Driven Testing using CSV', () => {

    const url = 'https://jsonplaceholder.typicode.com/posts';

    //read csv file form testdata folder
    const csvFilePath = 'testdata/postdata.csv';
    const csvdata= fs.readFileSync(csvFilePath, 'utf-8');

    type PostData = {
        userId: number;
        id: number;
        title: string;
        body: string;
    };

    
    const postData = parse<PostData>(csvdata,{

        columns: true,//first row as header
        skip_empty_lines: true,
        cast: true
    });

    const headers = {
        'content-type': 'application/json; charset=UTF-8'
    };

    for (const [index, postsdata] of postData.entries()) {
        test(`Traversing the test data row ${index + 1}`, async ({request}) => {

        const response = await request.post(url, {
            data: JSON.stringify(postsdata),
            headers: headers
        });

        expect(response.status()).toBe(201);

        const jsondata = await response.json();
        console.log("Created post Response" + jsondata);

        expect(jsondata.userId).toBe(postsdata.userId);
        expect(jsondata.title).toBe(postsdata.title);
        expect(jsondata.body).toBe(postsdata.body);
        expect(jsondata.id).toBeTruthy();
    });

}

});