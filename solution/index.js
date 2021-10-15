module.exports = function (Homework) {

    const getArrayLength = (array) => new Promise((resolve) => {
        array.length((result) => resolve(result))
    })

    const getArrayItemByIndex = (array, index) => new Promise((resolve) => {
        array.get(index, (result) => resolve(result))
    })

    const add = (a, b) => new Promise((resolve) => {
        Homework.add(a, b, (result) => resolve(result))
    })

    const subtract = (a, b) => new Promise((resolve) => {
        Homework.subtract(a, b, (result) => resolve(result))
    })

    const lessOrEqual = (a, b) => new Promise((resolve) => {
        Homework.lessOrEqual(a, b, (result) => resolve(result))
    })

    return async (array, fn, initialValue, cb) => {

        const length = await getArrayLength(array)
        const lastIndex = await subtract(length, 1)
        let currentItemIndex = 0
        let result = initialValue
		let shouldContinue = await lessOrEqual(currentItemIndex, lastIndex)

        while (shouldContinue) {
            const currentItem = await getArrayItemByIndex(array, currentItemIndex)
            result = await new Promise((resolve) => {
                fn(result, currentItem, currentItemIndex, array, (result) => resolve(result))
            })
            currentItemIndex = await add(currentItemIndex, 1)
			shouldContinue = await lessOrEqual(currentItemIndex, lastIndex)
        }

        if (cb) {
            cb(result)
        }

        return result
    }
}
