export type Recipe={
    id:number;
    title:string;
    description:string;
    authorId:number;
    ingredients:Array<string>;
    instructions:string;
}