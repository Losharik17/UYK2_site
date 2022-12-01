export const appVariants = {
    hidden: {
        opacity: 0
    },
    animate: {
        opacity: 1,
        transition: {
            delay: 3.5
        }
    }
}
export const loaderVariants = {
    hidden: {
        opacity: 1
    },
    animate: {
        opacity: 0,
        transition: {
            delay: 3.05,
        }
    }
}

export const footerVariants = {
    hidden: {
        y: '100vh',
        opacity: 0,
    },
    visible: {
        opacity: 1,
        y: '0',
        transition: {type: 'tween'}
    },
    exit: {
        y: '100vh',
    }
};

export const mainVariants = {
    hidden: {
        x: '100vw',
        opacity: 0,
    },
    visible: {
        opacity: 1,
        x: '0',
    },
    exit: {
        x: '-100vw',
        transition: {ease: 'easeInOut'}
    }
};

export const aboutVariants = {
    hidden: {
        y: '-5vh',
        opacity: 0
    },
    visible: {
        y: 0,
        opacity: 1
    }
}

export const loadNewsVariants = {
    hidden: {
        y: '-5vh',
        opacity: 0
    },
    visible: {
        y: 0,
        x: 0,
        opacity: 1
    }
}