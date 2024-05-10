export default {
    root: {
        class: ['cursor-pointer inline-flex relative select-none align-bottom', 'w-6 h-6']
    },
    input: {
        class: [
            'peer',

            // Size
            'w-full ',
            'h-full',

            // Position
            'absolute',
            'top-0 left-0',
            'z-10',

            // Spacing
            'p-0',
            'm-0',

            // Shape
            'opacity-0',
            'rounded-md',
            'outline-none',
            'border-2 border-surface-200 dark:border-surface-700',

            // Misc
            'appearance-none',
            'cursor-pointer'
        ]
    },
    box: ({ props, context }) => ({
        class: [
            // Alignment
            'flex',
            'items-center',
            'justify-center',

            // Size
            'w-6',
            'h-6',

            // Shape
            'rounded-md',
            'border-2',

            // Colors
            {
                'border-surface-200 bg-surface-0 dark:border-surface-700 dark:bg-surface-900': !context.checked,
                'border-primary bg-primary': context.checked
            },

            // States
            {
                'peer-hover:border-primary': !props.disabled && !context.checked,
                'peer-hover:bg-primary-hover peer-hover:border-primary-hover': !props.disabled && context.checked,
                'peer-focus-visible:border-primary-500 dark:peer-focus-visible:border-primary-400 peer-focus-visible:ring-2 peer-focus-visible:ring-primary-400/20 dark:peer-focus-visible:ring-primary-300/20': !props.disabled,
                'cursor-default opacity-60': props.disabled
            },

            // Invalid State
            { 'border-red-500 dark:border-red-400': props.invalid },

            // Transitions
            'transition-colors',
            'duration-200'
        ]
    }),
    checkicon: {
        class: [
            // Font
            'text-base leading-none',

            // Size
            'w-4',
            'h-4',

            // Colors
            'text-white dark:text-surface-900',

            // Transitions
            'transition-all',
            'duration-200'
        ]
    },
    uncheckicon: {
        class: [
            // Font
            'text-base leading-none',

            // Size
            'w-4',
            'h-4',

            // Colors
            'text-white dark:text-surface-900',

            // Transitions
            'transition-all',
            'duration-200'
        ]
    }
};
