/**
 * Executes function
 * @param {*} callback Callback to execute, if the provided param is a function
 * @param {...Object} args Arguments to call the passed function with
 */
const cb = (callback, ...args) => typeof callback === 'function' && callback(...args)

export default cb
