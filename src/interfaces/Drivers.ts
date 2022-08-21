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
    StandingsTable: StandingsTable
  }
  
  export interface StandingsTable {
    season: string
    StandingsLists: StandingsList[]
  }
  
  export interface StandingsList {
    season: string
    round: string
    DriverStandings: DriverStanding[]
  }
  
  export interface DriverStanding {
    driverId: string
    familyName: string
    givenName: string
    id: number
    points: string
    position: string
    round: string
    season: string
    wins: string
  }

  export interface Driver {
    driverId: string
    url: string
    givenName: string
    familyName: string
    dateOfBirth: string
    nationality: string
  }
  
  export interface Constructor {
    constructorId: string
    url: string
    name: string
    nationality: string
  }
  