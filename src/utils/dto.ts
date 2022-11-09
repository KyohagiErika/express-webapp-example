export interface DTO {
    name: string;
    type?: Function;
    validate?: (value: any) => string | null;
}