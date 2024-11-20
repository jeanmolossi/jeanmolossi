import { cn } from '@jeanmolossi/utils';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

function Heading1(
    props: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>,
) {
    const { children, className, ...headingProps } = props;
    return (
        <h1 className={cn('text-4xl font-bold', className)} {...headingProps}>
            <>{children}</>
        </h1>
    );
}

function Heading2(
    props: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>,
) {
    const { children, className, ...headingProps } = props;
    return (
        <h2 className={cn('text-2xl font-bold', className)} {...headingProps}>
            <>{children}</>
        </h2>
    );
}

function Heading3(
    props: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>,
) {
    const { children, className, ...headingProps } = props;
    return (
        <h3 className={cn('text-xl font-bold', className)} {...headingProps}>
            <>{children}</>
        </h3>
    );
}

function Heading4(
    props: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>,
) {
    const { children, className, ...headingProps } = props;
    return (
        <h4 className={cn('text-lg font-bold', className)} {...headingProps}>
            <>{children}</>
        </h4>
    );
}

function Heading5(
    props: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>,
) {
    const { children, className, ...headingProps } = props;
    return (
        <h5 className={cn('text-md font-bold', className)} {...headingProps}>
            <>{children}</>
        </h5>
    );
}

function Heading6(
    props: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>,
) {
    const { children, className, ...headingProps } = props;
    return (
        <h6 className={cn('text-sm font-bold', className)} {...headingProps}>
            <>{children}</>
        </h6>
    );
}

const Heading = {
    H1: Heading1,
    H2: Heading2,
    H3: Heading3,
    H4: Heading4,
    H5: Heading5,
    H6: Heading6,
};

export default Heading;
