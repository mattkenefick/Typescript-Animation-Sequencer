
declare var $: any;
declare var moment: any;
declare var _: any;

declare module Backbone {
    export class Model {
        constructor (attr? , opts? );
        get(name: string): any;
        set(name: string, val: any): void;
        set(obj: any): void;
        save(attr? , opts? ): void;
        destroy(): void;
        bind(ev: string, f: Function, ctx?: any): void;
        toJSON(): any;
    }
    export class Collection {
        constructor (models? , opts? );
        bind(ev: string, f: Function, ctx?: any): void;
        collection: Model;
        length: number;
        create(attrs, opts? ): Collection;
        each(f: (elem: any) => void ): void;
        fetch(opts?: any): void;
        last(): any;
        last(n: number): any[];
        filter(f: (elem: any) => any): Collection;
        without(...values: any[]): Collection;
    }
    export class View {
        constructor (options? );
        $(selector: string): any;
        el: HTMLElement;
        $el: any;
        model: Model;
        remove(): void;
        delegateEvents: any;
        make(tagName: string, attrs? , opts? ): View;
        setElement(element: HTMLElement, delegate?: boolean): void;
        tagName: string;
        events: any;
        trigger(name): any;

        static extend: any;
    }
    export class EventDispatcher {
        constructor (options? );
        on(name, callback, context): any;
        once(name, callback, context): any;
        off(name, callback, context): any;
        trigger(name, data?): any;
        stopListening(obj, name, callback): any;

        static extend: any;
    }
}
