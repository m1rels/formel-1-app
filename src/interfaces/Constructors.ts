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
    id: number
    name: string
    constructorId: string
    points: number
    season: string
    wins: string
    round: string
    position: string
  }
  
  export interface Constructor {
    constructorId: string
    url: string
    name: string
    nationality: string
  }
  