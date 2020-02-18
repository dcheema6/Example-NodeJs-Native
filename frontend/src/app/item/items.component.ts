import { Component, OnInit } from "@angular/core";

import { ItemService } from "./item.service";

@Component({
    selector: "ns-items",
    templateUrl: "./items.component.html",
    providers: [ItemService]
})
export class ItemsComponent implements OnInit {
    items: Array<any>;
    page = 0;
    queryText: string;
    doQuery = true;

    constructor(private itemService: ItemService) { }

    ngOnInit(): void {
    }

    onTextChanged(args) {
        console.log(args.value);
        if (!this.doQuery) return;
        this.doQuery = false;

        (async () => {
            // Delay saves about 50% queries
            await this.delay(300);

            this.queryText = args.object.text;
            if (!this.queryText) return;

            this.updateItems(this.queryText, true);
        }) ()
    }

    onClear(args) {
        this.doQuery = true;
        this.items = [];
    }

    onLoad(args) {
        console.log("loading...");
        this.page += 1;
        this.updateItems(this.queryText, false);
    }

    updateItems(text: string, clear: boolean) {
        this.itemService.queryItems(text, this.page).subscribe((result: any) => {
            if (clear) this.items = [];
            result.data.forEach(item => {
                this.items.push(item);
            });;
            this.doQuery = true;
        });
    }

    delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }
}
