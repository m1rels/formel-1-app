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
    ConstructorStandings: ConstructorStanding[]
  }
  
  export interface ConstructorStanding {
    position: string
    positionText: string
    points: string
    wins: string
    Constructor: Constructor
  }
  
  export interface Constructor {
    constructorId: string
    url: string
    name: string
    nationality: string
  }
  