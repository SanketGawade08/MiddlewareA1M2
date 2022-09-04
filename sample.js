const data = require('./data/data.json')

data.forEach(function (item) {
    // console.log('*'.repeat(20))
    console.log(item);
    item.IFT458 = 'Summer';
    item.payment = function (val = 2) {
        return item.credits * val;
    }
})

// data.forEach(function (item) {
//     console.log('*'.repeat(20))
//     console.log(item);
// })

data.forEach(function (item) {
    const { id, image } = item;
    console.log(`id = ${id}`);
    // console.log('id ' + id + '.');
    console.log(`id = ${image}`);
})

