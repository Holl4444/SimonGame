const MEM_LENGTH = 10;

export default function getColourOrder() {
    const options = ['red', 'blue', 'green', 'yellow'];
    const memoryOrder = [];
    for (let i = 0; i < MEM_LENGTH; i++) {
        const randomidx = Math.floor(Math.random() * options.length);
        memoryOrder.push(options[randomidx])
    }
    return memoryOrder;
}

