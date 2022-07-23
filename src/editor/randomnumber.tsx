export const randomnumber = (minNum: number,maxNum: number) => { 
            // return a random number between [minNUm, maxNum]
            return parseInt((Math.random()*(maxNum-minNum+1)+minNum).toString(),10); 

} 