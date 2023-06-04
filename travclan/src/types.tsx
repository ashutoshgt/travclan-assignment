export interface Hotel {
    id: number
    name: string;
    address: string;
    location: Location;
}

export interface Location {
    lat: number;
    lon: number
}