declare const _default: import("vue").DefineComponent<{
    command: {
        type: (ObjectConstructor | StringConstructor | NumberConstructor)[];
        defautl: () => {};
    };
    disabled: BooleanConstructor;
    divided: BooleanConstructor;
    icon: StringConstructor;
}, {
    handleClick: (e: UIEvent) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{} & {
    command?: unknown;
    disabled?: boolean;
    divided?: boolean;
    icon?: string;
}>, {}>;
export default _default;
