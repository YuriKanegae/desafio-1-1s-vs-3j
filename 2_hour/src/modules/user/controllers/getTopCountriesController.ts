import { Request, Response } from "express";

import BaseController from "../../baseController";
import UserRepository from "../repositories/UserRepository";

class GetTopCountriesController extends BaseController {

    public override async handleAsync(request: Request, response: Response): Promise<void> {
        
        const repository = new UserRepository();
        const users = repository.listUsers();
        
        // compute totals
        const countriesTotal: Record<string, number> = {};
        for( const user of users) {
            if(!countriesTotal[user.country])
                countriesTotal[user.country] = 0;

            countriesTotal[user.country]++;
        }

        // put totals and countries on array
        const countriesList: Array<{ country: string, total: number }> = [];
        for( const country of Object.keys(countriesTotal))
            countriesList.push({ country: country, total: countriesTotal[country] });

        const rankedCountries = countriesList.sort( ( countryA, coutryB ) => countryA.total > coutryB.total ? -1 : 1 );
        const top5Countries = rankedCountries.slice(5);

        response.json(top5Countries);
    }
}

export default GetTopCountriesController;