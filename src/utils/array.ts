/*
    Takes an array and shuffle it in random order through recursion
*/
export const shuffleArrayRecursive = (array: any[], currentIndex = 0): any[] => {
    if (currentIndex === array.length - 1) {
        return array;
    }
    
    const randomIndex = Math.floor(Math.random() * (array.length - currentIndex)) + currentIndex;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    return shuffleArrayRecursive(array, currentIndex + 1);
}