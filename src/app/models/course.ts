import { Timestamp } from "rxjs/internal/operators/timestamp";

export interface Course {
    id: number
    name: string
    time: Date
    length: number
}