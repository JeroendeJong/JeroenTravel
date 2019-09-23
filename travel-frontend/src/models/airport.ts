
class Airport {
  data: any;
  type: string;

  static isAirport(potentialAirport: any): boolean {
    if (!potentialAirport) return false;
    if (typeof potentialAirport !== 'object') return false;
    if (potentialAirport.type === 'airport') return true;
    return false;
  }

  constructor(feature: any) {
    this.data = feature;
    this.type = feature.type;
  }

}

export default Airport;