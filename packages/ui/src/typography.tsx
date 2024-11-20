import { Slot, SlotProps } from '@radix-ui/react-slot';
import { cva, VariantProps } from 'class-variance-authority';
import { PropsWithChildren } from 'react';

const typoVariants = cva('', {
    variants: {
        size: {
            h1: 'text-5xl font-bold',
            h2: 'text-4xl font-bold',
            h3: 'text-3xl font-bold',
            h4: 'text-2xl font-bold',
            h5: 'text-xl font-bold',
            h6: 'text-lg font-bold',
            normal: 'text-base',
            small: 'text-sm text-muted-foreground',
            xsmall: 'text-xs text-muted-foreground',
        },
        center: {
            true: 'text-center',
            false: '',
        },
    },
    defaultVariants: {
        size: 'normal',
        center: false,
    },
});

type SizeVariants = VariantProps<typeof typoVariants>['size'];
type CenterVariants = VariantProps<typeof typoVariants>['center'];

interface TypographyProps extends SlotProps {
    asChild?: boolean;
    variant?: SizeVariants;
    center?: CenterVariants;
}

function Typography(props: PropsWithChildren<TypographyProps>) {
    const { asChild, variant, center, className, ...typoProps } = props;
    const Component = asChild ? Slot : 'p';
    return (
        <Component className={typoVariants({ size: variant, center, className })} {...typoProps} />
    );
}

export { Typography };
export type { TypographyProps };
