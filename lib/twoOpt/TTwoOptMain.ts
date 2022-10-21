import { TTour } from "./TTour";
import { TTSPMap } from "./TTSPMap";
import { TTwoOpt } from "./TTwoOpt";

export class TTwoOptMain {
	
	main() {
		let coordinates: number[][] = [
			[100.,100.],
			[200.,100.],
			[250.,187.],
			[200.,273.],
			[100.,273.],
			[50.,187.]
		];

		let tspmap: TTSPMap = new TTSPMap(coordinates);
		let tour: TTour = new TTour(tspmap);
		let twoopt: TTwoOpt = new TTwoOpt(tour);
		twoopt.run();
	  console.log(`${tour.getTourLength()}`);
	}
}