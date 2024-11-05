import { createConnection } from "mysql2";

export const connection = ()=>{
    try {
        const pool = createConnection({
            host:'localhost',
            port:'3306',
            user:'root',
            password:'root',
            database:'DBAWSInventario'
        })
        console.log('Connected To DB');
        return pool
    } catch (error) {
        return console.error('DB Error: ',error);
    }
}
