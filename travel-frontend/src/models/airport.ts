
class Airport {
  data: any;

  static isAirport(potentialAirport: any): boolean {
    if (!potentialAirport) return false;
    if (typeof potentialAirport !== 'object') return false;
    if (potentialAirport.type === 'airport') return true;
    return false;
  }

  constructor(feature: any) {
    this.data = feature;
  }

}

export default Airport;