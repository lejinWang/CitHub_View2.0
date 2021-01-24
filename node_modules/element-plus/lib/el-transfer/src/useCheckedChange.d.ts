import { TransferCheckedState, Key } from './transfer';
export declare const useCheckedChange: (checkedState: TransferCheckedState, emit: any) => {
    onSourceCheckedChange: (val: Key[], movedKeys: Key[]) => void;
    onTargetCheckedChange: (val: Key[], movedKeys: Key[]) => void;
};
