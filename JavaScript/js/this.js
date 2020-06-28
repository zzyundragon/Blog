function baz() {
  bar()
}
function bar() {
  foo()
}
function foo() {
  debugger
  console.log('this')
}
baz()