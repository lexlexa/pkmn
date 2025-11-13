import { Flex, TreeSelect, Typography, type TreeSelectProps } from "antd";
import type { FC } from "react";

type Props = {
    value?: string;
    options: TreeSelectProps['treeData'];
    label: string;
    onChange: (value: string) => void;
    placeholder?: string;
    fixedWidth?: number | string;
    required?: boolean,
    disabled?: boolean;
};

export const FormTreeSelect: FC<Props> = ({
    value,
    label,
    onChange,
    placeholder = 'Не выбрано',
    options,
    fixedWidth,
    required,
    disabled
}) => {
    return (
        <Flex vertical gap={4} style={{ width: fixedWidth }}>
            <Typography.Text strong>
                {label}
                {required && <span style={{ color: 'red' }}>*</span>}
            </Typography.Text>
            <TreeSelect
                style={{ width: fixedWidth, flexShrink: 0 }}
                treeData={options}
                value={value}
                showSearch
                disabled={disabled}
                placeholder={placeholder}
                onChange={onChange}
            />
        </Flex>
    );
};
