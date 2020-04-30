import { Beer } from 'src/app/dtos/beer.dto';

export function createBeer(params: Partial<Beer>) {
  return {
    ...params
  } as Beer;
}
