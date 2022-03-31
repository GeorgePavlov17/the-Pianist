function thePianist (input) {

    let numPieces = +input.shift();
    
    let pianist = {};

    for (let i = 0; i < numPieces; i++) {
        let tokens = input.shift().split('|');
        let [pieces, composer, key] = tokens;

        if (!pianist.hasOwnProperty(pieces)) { //ako ti ne namirash takova property
            pianist[pieces] = {} //sazdai mi prazen obekt s tozi kluch [pieces]
        } 

        pianist[pieces] = { // ako imash property pieces
            composer, // vkarai mi kluchove composer
            key // i kluch key vzeti ot destrukturiraneto
        }
    }

    while (input[0] !== 'Stop') {
        let [command, pieces, composer, key] = input.shift().split('|');
       
        if (command === 'Add') {
            if(!pianist.hasOwnProperty(pieces)) {
                pianist[pieces] = {
                    composer,
                    key
                }
                console.log(`${pieces} by ${composer} in ${key} added to the collection!`);
            } else {
                console.log(`${pieces} is already in the collection!`);
            }

        } else if (command === 'Remove') {
            if(pianist.hasOwnProperty(pieces)) {
                delete pianist[pieces];
                console.log(`Successfully removed ${pieces}!`);
            } else {
                console.log(`Invalid operation! ${pieces} does not exist in the collection.`);
            }

        } else if (command === 'ChangeKey') {
            if (pianist.hasOwnProperty(pieces)) {
                pianist[pieces].key = composer; 
                console.log(`Changed the key of ${pieces} to ${composer}!`);
            } else {
                console.log(`Invalid operation! ${pieces} does not exist in the collection.`);
            }
        }
    }
    let keys = Object.keys(pianist);

    for (let key of keys) {
        console.log(`${key} -> Composer: ${pianist[key].composer}, Key: ${pianist[key].key}`);
    }
}

thePianist (['3',
    'Fur Elise|Beethoven|A Minor',
    'Moonlight Sonata|Beethoven|C# Minor',
    'Clair de Lune|Debussy|C# Minor',
    'Add|Sonata No.2|Chopin|B Minor',
    'Add|Hungarian Rhapsody No.2|Liszt|C# Minor',
    'Add|Fur Elise|Beethoven|C# Minor',
    'Remove|Clair de Lune',
    'ChangeKey|Moonlight Sonata|C# Major',
    'Stop']);