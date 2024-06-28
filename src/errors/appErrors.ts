export class AppErrors extends Error{
    code:number;
    constructor(msg: string, code=400){
        super(msg);
        this.code=code;
    };

}