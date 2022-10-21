import { TTour } from "./TTour";

export class TTwoOpt {
	fTour: TTour;
	fDimension: number;
	fCurrentIndex: number;

	constructor(tour: TTour) {
		this.fTour = tour;
		this.fDimension = tour.getDimension();
		this.fCurrentIndex = 0;
	}

	run(): void {
		let restart:boolean = true;
		while (restart) {
			restart = false;
			for (let i:number=0;i<this.fDimension; ++i) {
				let va:number = this.fTour.getVertex(i);
				let vb:number = this.fTour.next(va);
				for (let j:number=0;j<this.fDimension;++j) {
					if (i==j) continue;
					let vc:number = this.fTour.getVertex(j);
					let vd:number = this.fTour.next(vc);
					if (0< this.fTour.gain(va,vb,vc,vd)) {
						this.fTour.flip(va,vb,vc,vd);
						restart = true;
						break;
					}
				}
				if (restart) break;
			}
		}
	}
}