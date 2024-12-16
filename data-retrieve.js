import { Client } from 'espn-fantasy-football-api';
import dotenv from 'dotenv';

dotenv.config();
const myClient = new Client({ leagueId: 5989478 });
myClient.setCookies({ 
    espnS2: process.env.ESPN_S2, 
    SWID: process.env.SWID 
});