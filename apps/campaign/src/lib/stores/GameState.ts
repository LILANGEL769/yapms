import { derived, writable } from 'svelte/store';

export const CurrentQuestion = writable(1);

export const Questions = writable([
    {
        text: 'What is your favorite color?',
        answers: [
            {
                text: 'Red',
                value: 1
            },
            {
                text: 'Blue',
                value: 2
            }
        ],
        answer: 0
    },
    {
        text: 'What is your favorite animal?',
        answers: [
            {
                text: 'Dog',
                value: 1
            },
            {
                text: 'Cat',
                value: 2
            }
        ],
        answer: null
    },
    {
        text: 'What is your favorite food?',
        answers: [
            {
                text: 'Pizza',
                value: 1
            },
            {
                text: 'Burgers',
                value: 2
            }
        ],
        answer: null
    }
]);

export const PollResult = derived(Questions, () => {
    return 0;
});

export const ElectionResult = derived(Questions, () => {
    return 0;
});