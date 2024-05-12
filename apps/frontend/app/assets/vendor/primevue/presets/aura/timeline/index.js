export default {
    root: ({ props }) => ({
        class: [
            'flex grow',
            {
                'flex-col': props.layout === 'vertical',
                'flex-row flex-1': props.layout === 'horizontal'
            }
        ]
    }),
    event: ({ props, context }) => ({
        class: [
            'flex relative min-h-[70px]',
            {
                'flex-row-reverse': props.align === 'right' || (props.layout === 'vertical' && props.align === 'alternate' && context.index % 2 === 1),
                'flex-col flex-1': props.layout === 'horizontal',
                'flex-col-reverse ': props.align === 'bottom' || (props.layout === 'horizontal' && props.align === 'alternate' && context.index % 2 === 1)
            }
        ]
    }),
    opposite: ({ props, context }) => ({
        class: [
            'flex-1',
            {
                'px-4': props.layout === 'vertical',
                'py-4': props.layout === 'horizontal'
            },
            {
                'text-right': props.align === 'left' || (props.layout === 'vertical' && props.align === 'alternate' && context.index % 2 === 0),
                'text-left': props.align === 'right' || (props.layout === 'vertical' && props.align === 'alternate' && context.index % 2 === 1)
            }
        ]
    }),
    separator: ({ props }) => ({
        class: [
            'flex items-center flex-initial',
            {
                'flex-col': props.layout === 'vertical',
                'flex-row': props.layout === 'horizontal'
            }
        ]
    }),
    marker: {
        class: [
            'relative',

            // Display & Flexbox
            'inline-flex items-center justify-center',

            // Size
            'w-[1.125rem] h-[1.125rem]',

            // Appearance
            'rounded-full border-2 border-surface-200 bg-surface-0 dark:border-surface-700 dark:bg-surface-950',

            // Before
            'before:rounded-full before:w-[0.375rem] before:h-[0.375rem] before:bg-primary',
            // After
            'after:absolute after:rounded-full after:w-full after:h-full after:shadow-sm'
        ]
    },
    connector: ({ props }) => ({
        class: [
            'grow bg-surface-300 dark:bg-surface-700',
            {
                'w-[2px]': props.layout === 'vertical',
                'w-full h-[2px]': props.layout === 'horizontal'
            }
        ]
    }),
    content: ({ props, context }) => ({
        class: [
            'flex-1',
            {
                'px-4': props.layout === 'vertical',
                'py-4': props.layout === 'horizontal'
            },
            {
                'text-left': props.align === 'left' || (props.layout === 'vertical' && props.align === 'alternate' && context.index % 2 === 0),
                'text-right': props.align === 'right' || (props.layout === 'vertical' && props.align === 'alternate' && context.index % 2 === 1)
            },
            {
                'min-h-0': props.layout === 'vertical' && context.index === context.count - 1,
                'grow-0': props.layout === 'horizontal' && context.index === context.count - 1
            }
        ]
    })
};
