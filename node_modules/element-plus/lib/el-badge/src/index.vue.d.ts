declare const _default: {
    name: string;
    props: {
        value: {
            type: (StringConstructor | NumberConstructor)[];
            default: string;
        };
        max: {
            type: NumberConstructor;
            default: number;
        };
        isDot: BooleanConstructor;
        hidden: BooleanConstructor;
        type: {
            type: StringConstructor;
            default: string;
            validator: (val: string) => boolean;
        };
    };
    setup(props: any): {
        content: import("vue").ComputedRef<any>;
    };
};
export default _default;
