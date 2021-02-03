// copied from express-async-handler
// this allows errors that happen in async request handlers
// to be caught by the default express error handler
const catchAsyncError = fn =>
  function asyncUtilWrap(...args) {
    const fnReturn = fn(...args)
    const next = args[args.length-1]
    return Promise.resolve(fnReturn).catch(next)
  }

module.exports = catchAsyncError