export type DateType = {
    value: string;
    label: string;
}

export interface ICardType {
    name: string | null;
    card: number | null;
    date: {
        month: DateType,
        year: DateType
    };
    cvv: string;
}