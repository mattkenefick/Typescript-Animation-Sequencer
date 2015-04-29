

module Animation {

    export class Events {

        public static get DONE():string { return "animation:done"; }

        public static get SEQUENCE_ADVANCE():string { return "animation:sequence.advance"; }
        public static get SEQUENCE_COMPLETE():string { return "animation:sequence.complete"; }

        public static get IN():string { return "animation:in"; }
        public static get OUT():string { return "animation:out"; }
        public static get IN_START():string { return "animation:in.start"; }
        public static get OUT_START():string { return "animation:out.start"; }

    }

}