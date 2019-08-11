export declare module checkout {
    export interface Order {
        items: Item[];
    }
    
    export interface Order {
        items: Item[];
    }
    
    export interface Item {
        id: string;
        quantity: string;
        seller: string;
    }

    export interface OrderSimulation {
        simulation: Simulation;
        addCart?: string;
    }

    export interface Simulation {
        items: Item[];
        geoCoordinates: Number[];
        postalCode: string;
        country: string;
    }
}
