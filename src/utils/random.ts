import seedrandom from 'seedrandom';

export const randGeneratorFrom = (seed) => {
    const generator = seedrandom(seed);

    return (min, max) => Math.floor(generator() * max) + min;
};
