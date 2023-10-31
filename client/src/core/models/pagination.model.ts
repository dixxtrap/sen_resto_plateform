export class IPagination {
  constructor(
    public page: number = 0,
    public perpage: number = 10,
    public search: string = "",
    public fromdate: string = "0000"
  ) {}
}
