require('dotenv').config();

//Ref : https://github.com/umami-software/umami/blob/master/scripts/check-env.js

function checkMissing(vars) {
    const missing = vars.reduce((arr, key) => {
        if (!process.env[key]) {
            arr.push(key);
        }
        return arr;
    }, []);

    if (missing.length) {
        console.log(`\x1b[31mThe following environment variables are not defined:\x1b[0m`);
        for (const item of missing) {
            console.log(' - ', item);
        }
        process.exit(1);
    } else {
        console.log('\x1b[32mAll environment variables are defined.\x1b[0m');
    }
}

checkMissing(['DATABASE_URL'])