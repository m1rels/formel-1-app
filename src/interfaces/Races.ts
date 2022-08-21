export interface Root {
    MRData: Mrdata
  }
  
  export interface Mrdata {
    xmlns: string
    series: string
    url: string
    limit: string
    offset: string
    total: string
    RaceTable: RaceTable
  }
  
  export interface RaceTable {
    season: string
    Races: Race[]
  }
  
  export interface Race {
    circuitName: string
    date: string
    id: number
    raceName: string
    round: string
    season: string
    url: string
  }
  
  export interface Circuit {
    circuitId: string
    url: string
    circuitName: string
    Location: Location
    locality: string
    id: number
  }
  
  export interface Location {
    lat: string
    long: string
    locality: string
    country: string
  }
  