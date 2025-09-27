import { Connection } from "../config/db";

export interface AboutUs {
    id?: number;
    title: string;
    description: string;
}

//get all 
export class AboutUsModel {
    static async getAll(): Promise<AboutUs[]> {
        const [rows] = await Connection.execute('SELECT * FROM aboutus');
        return rows as AboutUs[];
    }

//create    
    static async create(aboutUs: AboutUs): Promise<number> {
        const [result] = await Connection.execute(
            'INSERT INTO aboutus (title, description) VALUES (?, ?)',
            [aboutUs.title, aboutUs.description]
        );
        return (result as any).insertId;
    }

}

export default AboutUsModel;
