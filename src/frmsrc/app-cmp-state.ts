import { BlogInfo } from "./blog-info";

export class AppCmpState{
   nomState! : string; // donnée membre
   message!: string;
   currentBlogInfo! : BlogInfo;
   liste! : BlogInfo[];
}