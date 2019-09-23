
class Flight {
  data: any;
  type: string;

  static isFlight(potentialFlight: any): boolean {
    if (!potentialFlight) return false;
    if (typeof potentialFlight !== 'object') return false;
    if (potentialFlight.type === 'flight') return true;
    return false;
  }

  constructor(feature: any) {
    this.data = feature;
    this.type = feature.type;
  }

}

export default Flight;